import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import chalk from 'chalk';
import type { ExternalLink } from '@shop/dto';

@Injectable()
export class PageLogoService {
  async getIcon(url: string): Promise<string | null> {
    try {
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      });

      const $ = cheerio.load(data);

      const icons = $('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');

      const lastIcon = icons.last();
      let href = lastIcon.attr('href');

      if (!href || icons.length === 0) {
        const u = new URL(url);
        const domain = u.origin;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      }

      const baseUrl = new URL(url).origin;
      if (!href.startsWith('http')) {
        href = `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
      }

      return href;
    } catch (error) {
      console.error(chalk.red.bold(`Error fetching icon:`), error);
      throw Error(error as any);
    }
  }

  async signMultiple(resource: ExternalLink[]) {
    const r = await Promise.all(
      resource.map(async (link) => ({
        ...link,
        avatarUrl: await this.getIcon(link.url),
      }))
    );
    return r;
  }
}
