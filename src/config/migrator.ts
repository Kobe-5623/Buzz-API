import { fileURLToPath } from 'node:url';
import { SequelizeStorage, Umzug } from 'umzug';
import { sequelize } from './database.js';

const extension = import.meta.url.endsWith('.ts') ? 'ts' : 'js';
const migrationsGlob = fileURLToPath(new URL(`../migrations/*.${extension}`, import.meta.url));

export const migrator = new Umzug({
  migrations: { glob: migrationsGlob },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
