import { BadRequestException, Controller, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { User } from '@decorators';
import { UploadImageDto } from '@shop/dto';
import { existsSync, writeFileSync } from 'node:fs';
import { mkdirSync } from 'fs';
import { join } from 'node:path';
import { extname } from 'path';
import { MediaService } from './media.service';
import { ResponseTransformer } from '@shop/factory';
import type { UserJWT, UserProfileImage } from '@shop/type';
import { MediaImagAllowedMsg, MediaImageMimes } from '@shop/platform';
import { deleteFileStartsWith } from '@utils';

@Controller('media')
export class MediaController {
  constructor(private readonly mds: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
        limits: {
          fileSize: 10 * 1024 ** 2,
        },
        fileFilter(_, file, callback) {
          if (MediaImageMimes.includes(file.mimetype)) {
            callback(null, true);
          } else {
            callback(
              new BadRequestException({
                message: `Chỉ chấp nhận file ảnh (${MediaImagAllowedMsg.toUpperCase()})`,
                status: HttpStatus.FORBIDDEN,
              }),
              false
            );
          }
        },
      }
    )
  )
  async uploadFiles(@UploadedFiles() files: UploadImageDto, @User() user: UserJWT) {
    const banner = files.banner?.[0];
    const avatar = files.avatar?.[0];

    const savedPath = join(__dirname, '../public', 'profile-img');
    if (!existsSync(savedPath)) {
      mkdirSync(savedPath, { recursive: true });
    }
    const userPath = join(__dirname, '../public', 'profile-img', `${user.id}`);
    if (!existsSync(userPath)) mkdirSync(userPath, { recursive: true });
    console.log({
      savedPath,
      userPath,
    });
    const result: UserProfileImage = {
      banner: null,
      avatar: null,
    };

    if (banner && banner.buffer) {
      const ext = extname(banner.originalname);
      const n = Date.now();
      const bannerPath = join(userPath, `banner_${n}${ext}`);
      try {
        deleteFileStartsWith('banner', user.id);
      } catch {}
      writeFileSync(bannerPath, banner.buffer); // ✅ buffer có giá trị
      result.banner = `/profile-img/${user.id}/banner_${n}${ext}`;
    }

    if (avatar && avatar.buffer) {
      const ext = extname(avatar.originalname);
      const n = Date.now();
      const avatarPath = join(userPath, `avatar_${n}${ext}`);
      try {
        // unlinkSync(avatarPath);
        deleteFileStartsWith('avatar', user.id);
      } catch {}
      writeFileSync(avatarPath, avatar.buffer); // ✅ buffer có giá trị
      console.log(`@@ write file`, avatarPath);
      result.avatar = `/profile-img/${user.id}/avatar_${n}${ext}`;
    }

    await this.mds.updateUserImage({ avatar: result.avatar, banner: result.banner }, user);

    return new ResponseTransformer({
      message: 'Upload thành công',
      status: HttpStatus.OK,
      data: result,
    });
  }
}
