import 'dotenv/config';

function integer(name: string, fallback: number): number {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value)) throw new Error(`${name} must be an integer`);
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const jwtSecret = process.env.JWT_SECRET ?? 'development-only-secret-change-me-now';

if (nodeEnv === 'production' && jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must contain at least 32 characters in production');
}

export const env = {
  nodeEnv,
  port: integer('PORT', 3000),
  databaseUrl: process.env.DATABASE_URL ?? './data/development.sqlite',
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  bcryptRounds: integer('BCRYPT_ROUNDS', 12),
};
