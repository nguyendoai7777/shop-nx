import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class PageLogoService {
  async getIcon(url: string): Promise<string | null> {
    try {
      const { data } = await axios.get(url, {
        headers: {
          // Một số site yêu cầu user-agent thật
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      });

      const $ = cheerio.load(data);

      // Tìm tất cả link[rel="icon"]
      const icons = $('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');

      if (icons.length === 0) {
        return null;
      }

      // Lấy phần tử cuối cùng tìm được (như yêu cầu)
      const lastIcon = icons.last();
      let href = lastIcon.attr('href');

      if (!href) {
        return null;
      }

      // Chuẩn hóa URL nếu là tương đối
      const baseUrl = new URL(url).origin;
      if (!href.startsWith('http')) {
        // nếu href bắt đầu bằng '/', nối vào baseUrl
        href = `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
      }

      return href;
    } catch (error) {
      console.error('Error fetching icon:', error);
      return null;
    }
  }
}
