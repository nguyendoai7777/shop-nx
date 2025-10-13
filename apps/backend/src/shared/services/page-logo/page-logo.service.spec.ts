import { Test, TestingModule } from '@nestjs/testing';
import { PageLogoService } from './page-logo.service';
import chalk from 'chalk';

describe('PageLogoService', () => {
  let service: PageLogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageLogoService],
    }).compile();

    service = module.get(PageLogoService);
  });

  it('should fetch and log favicon URL from YouTube channel', async () => {
    const testUrl = 'https://www.youtube.com/@kayffchill';
    const href = await service.getIcon(testUrl);
    console.log(chalk.green.bold('🔗youtube Favicon URL:'), href);
    // Có thể assert cơ bản
    expect(typeof href).toBe('string');
    expect(href).toContain('youtube.com');
  }, 20000);

  it('should fetch and log favicon URL from Facebook channel', async () => {
    const testUrl = 'https://www.facebook.com';
    const href = await service.getIcon(testUrl);
    console.log(chalk.green.bold('🔗 Facebook Favicon URL:'), href);
    // Có thể assert cơ bản
    expect(typeof href).toBe('string');
    expect(href).toContain('fbcdn');
  }, 20000);
});
