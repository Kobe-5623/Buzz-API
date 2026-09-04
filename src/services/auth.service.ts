import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { User as UserInstance } from '../models/User.js';
import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import type { LoginInput, SignupInput } from '../validators/user.validators.js';

function createToken(user: UserInstance): string {
  return jwt.sign(
    { sub: String(user.id) },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

async function ensureUnique(property: string, value: unknown, message: string, code: string): Promise<void> {
  const existing = await User.findOne({ where: { [property]: value } });
  if (existing) throw new ApiError(409, message, code);
}

export async function signup(input: SignupInput) {
  await ensureUnique('instiEmail', input.instiEmail,'Institutional Email is already registered', 'INSTI_EMAIL_EXISTS' )
  await ensureUnique('username', input.username,'Username is already registered', 'USERNAME_EXISTS' );
  const passwordHash = await bcrypt.hash(input.password, env.bcryptRounds);
  const user = await User.create(
    { 
      firstName: input.firstName, 
      middleName: input.middleName, 
      surname: input.surname,
      studentNumber: input.studentNumber,
      course: input.course,
      instiEmail: input.instiEmail, 
      username: input.username,
      passwordHash, 
    });
  return { user, token: createToken(user) };
}

export async function login(input: LoginInput) {
  const user = await User.findOne({ where: { username: input.username } });
  const valid = user ? await bcrypt.compare(input.password, user.passwordHash) : false;
  if (!user || !valid) throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  if (user.deletedAt && user.deletedAt <= new Date()) throw new ApiError(403, 'Account has been deactivated', 'ACCOUNT_DEACTIVATED');
  return { user, token: createToken(user) };
}
