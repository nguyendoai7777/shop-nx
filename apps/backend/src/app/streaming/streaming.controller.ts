import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { StreamingService } from './streaming.service';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get(':trackId/:segment')
  async getSegment(
    @Param('trackId') trackId: string,
    @Param('segment') segment: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const file = path.join('/private/hls/', trackId, segment);
    if (!fs.existsSync(file)) return res.status(404).send('Not found');

    // Bắt range header nếu cần (simple streaming)
    const stat = fs.statSync(file);
    const total = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      const chunkSize = end - start + 1;
      const stream = fs.createReadStream(file, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/MP2T',
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': total,
        'Content-Type': 'video/MP2T',
      });
      fs.createReadStream(file).pipe(res);
    }
    return 1;
  }
}
