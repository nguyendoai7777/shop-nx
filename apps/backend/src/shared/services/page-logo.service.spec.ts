import { Test, TestingModule } from '@nestjs/testing';
import { PageLogoService } from './page-logo.service';
import chalk from 'chalk';

describe('PageLogoService', () => {
  let service: PageLogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageLogoService],
    }).compile();

    service = module.get<PageLogoService>(PageLogoService);
  });

  it('should fetch and log favicon URL from YouTube channel', async () => {
    const testUrl = 'https://www.youtube.com/@kayffchill';
    const href = await service.getIcon(testUrl);
    console.log(chalk.green.bold('🔗 Favicon URL:'), href);
    // Có thể assert cơ bản
    expect(typeof href).toBe('string');
    expect(href).toContain('youtube.com'); // favicon nằm cùng domain
  }, 20000); // tăng timeout vì request có thể mất vài giây
});
