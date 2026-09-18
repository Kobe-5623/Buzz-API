import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { User } from '../models/User.js';
import { Admin as AdminModel, User as UserModel } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import type { LoginInput, SignupInput } from '../validators/user.validators.js';
import type { Admin } from '../models/Admin.js';

function createToken(user: User|Admin): string {
  return jwt.sign(
    { sub: String(user.id) },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

async function ensureUnique(property: string, value: unknown, message: string, code: string): Promise<void> {
  const existing = await UserModel.findOne({ where: { [property]: value } });
  if (existing) throw new ApiError(409, message, code);
}

export async function signup(input: SignupInput) {
  await ensureUnique('instiEmail', input.instiEmail,'Institutional Email is already registered', 'INSTI_EMAIL_EXISTS' )
  await ensureUnique('username', input.username,'Username is already registered', 'USERNAME_EXISTS' );
  await ensureUnique('studentNumber', input.studentNumber, 'Student Number is already registered', 'STUDENT_NUMBER_EXISTS')
  const passwordHash = await bcrypt.hash(input.password, env.bcryptRounds);
  const user = await UserModel.create(
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
  let user: User|Admin|null = await UserModel.findOne({ where: { username: input.username } });
  if (!user) user = await AdminModel.findOne({ where: { username: input.username } });
  const valid = user ? await bcrypt.compare(input.password, user.passwordHash) : false;
  if (!user || !valid) throw new ApiError(401, 'Invalid username or password', 'INVALID_CREDENTIALS');
  if (user.deletedAt && user.deletedAt <= new Date()) throw new ApiError(403, 'Account has been deleted', 'ACCOUNT_DELETED');
  user.deletedAt = null;
  const updatedUser = await user.save();
  return { updatedUser, token: createToken(user) };
}
