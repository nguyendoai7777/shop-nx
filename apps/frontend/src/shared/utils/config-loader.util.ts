import { AppConfig } from '@types';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

let appConfig: AppConfig;

export async function loadConfig() {
  /* if (!appConfig) {
    const res = await fetch("/config.json", { cache: "no-store" })
    appConfig = await res.json()
  }
  return appConfig*/

  if (appConfig) return appConfig;

  const file = join(process.cwd(), 'public', 'config.json');
  const raw = readFileSync(file, 'utf-8');
  appConfig = JSON.parse(raw) as AppConfig;
  return appConfig;
}
