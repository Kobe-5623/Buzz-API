import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import type { User } from '../models/User.js';
import { User as UserModel } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import type { UpdateUserInput } from '../validators/user.validators.js';

export async function updateUser(user: User, input: UpdateUserInput): Promise<User> {
  if (input.email && input.email !== user.email) {
    const existing = await UserModel.findOne({ where: { email: input.email } });
    if (existing) throw new ApiError(409, 'Email is already registered', 'EMAIL_EXISTS');
  }
  if (input.password) {
    const valid = await bcrypt.compare(input.currentPassword ?? '', user.passwordHash);
    if (!valid) throw new ApiError(401, 'Current password is incorrect', 'INVALID_CURRENT_PASSWORD');
    user.passwordHash = await bcrypt.hash(input.password, env.bcryptRounds);
  }
  if (input.name) user.name = input.name;
  if (input.email) user.email = input.email;
  return user.save();
}

export async function deactivateUser(user: User): Promise<User> {
  user.isActive = false;
  user.deactivatedAt = new Date();
  return user.save();
}
