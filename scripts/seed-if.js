// scripts/ sedd-if.ts

import { execSync } from 'node:child_process';
import 'dotenv/config';

const shouldSeed = process.env.SEED_ON_BUILD === 'true';
if (shouldSeed) {
  console.log('SEED_ON_BUILD=true → running db:seed…');
  execSync('npm run db:seed', { stdio: 'inherit' });
} else {
  console.log('SEED_ON_BUILD not true → skipping seed.');
}
