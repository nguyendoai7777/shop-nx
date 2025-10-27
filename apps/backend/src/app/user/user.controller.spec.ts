import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ResponseTransformer } from '@shop/factory';
import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserJWT } from '@shop/type';
jest.mock('./user.service');

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            updateUserInfoSetting: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Update User without password', async () => {
    const payload = {
      lastname: 'Shark',
      firstname: 'Binh chó lợn',
      password: '',
      confirmPassword: '',
    };
    const user: UserJWT = { id: 1, email: 'jon@gmail.com', name: 'John', exp: 1, iat: 1, username: 'johnxx' };
    (userService.updateUserInfoSetting as jest.Mock).mockResolvedValueOnce(undefined);
    const result = await controller.updateUserProfile(payload, user);
    expect(userService.updateUserInfoSetting).toHaveBeenCalledWith(
      expect.objectContaining({
        firstname: 'Binh chó lợn',
        lastname: 'Shark',
      }),
      1
    );
    expect(result).toEqual(
      new ResponseTransformer({
        message: 'Cập nhật thành công',
        status: HttpStatus.OK,
      })
    );
  });

  it('Update User with password', async () => {
    const payload = {
      lastname: 'Shark',
      firstname: 'Binh chó lợn',
      password: 'mr@dxd&123',
      confirmPassword: 'mr@dxd&123',
    };
    const user: UserJWT = { id: 1, email: 'jon@gmail.com', name: 'John', exp: 1, iat: 1, username: 'johnxx' };
    (userService.updateUserInfoSetting as jest.Mock).mockResolvedValueOnce(undefined);
    const result = await controller.updateUserProfile(payload, user);
    expect(userService.updateUserInfoSetting).toHaveBeenCalledWith(
      expect.objectContaining({
        firstname: 'Binh chó lợn',
        lastname: 'Shark',
        password: expect.any(String),
      }),
      1
    );
    expect(result).toEqual(
      new ResponseTransformer({
        message: 'Cập nhật thành công',
        status: HttpStatus.OK,
      })
    );
  });
});
