import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { User as UserInstance } from '../models/User.js';
import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import type { LoginInput, SignupInput } from '../validators/user.validators.js';

function createToken(user: UserInstance): string {
  return jwt.sign(
    { sub: String(user.id), email: user.email },
    env.jwtSecret,
    // jsonwebtoken accepts duration strings at runtime; its duration type is intentionally narrower.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] },
  );
}

export async function signup(input: SignupInput) {
  const existing = await User.findOne({ where: { email: input.email } });
  if (existing) throw new ApiError(409, 'Email is already registered', 'EMAIL_EXISTS');
  const passwordHash = await bcrypt.hash(input.password, env.bcryptRounds);
  const user = await User.create({ name: input.name, email: input.email, passwordHash, deactivatedAt: null });
  return { user, token: createToken(user) };
}

export async function login(input: LoginInput) {
  const user = await User.findOne({ where: { email: input.email } });
  const valid = user ? await bcrypt.compare(input.password, user.passwordHash) : false;
  if (!user || !valid) throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  if (!user.isActive) throw new ApiError(403, 'Account has been deactivated', 'ACCOUNT_DEACTIVATED');
  return { user, token: createToken(user) };
}
