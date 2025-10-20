import { join } from 'node:path';
import { readdirSync, unlinkSync } from 'node:fs';
import { getCwd } from 'nx/src/utils/path';

export const deleteFileStartsWith = (prefix: string, userId: string | number) => {
  const dir = join(__dirname, '../public', 'profile-img', String(userId));
  console.log({
    getCwd: getCwd(),
    __dirname,
  });
  try {
    console.log(`@ deleteFileStartsWith`, dir);
    const files = readdirSync(dir);
    console.log(`@ alo`, files);
    const targets = files.filter((f) => f.startsWith(prefix));
    for (const file of targets) {
      unlinkSync(join(dir, file));
      console.log(`Deleted: ${file}`);
    }
    return targets;
  } catch (err: any) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      console.warn(`Folder for user ${userId} not found.`);
      return [];
    }
    throw err;
  }
};
