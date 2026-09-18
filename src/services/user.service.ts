import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import type { User } from '../models/User.js';
import { User as UserModel, Block as BlockModel } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import type { UpdateUserInput } from '../validators/user.validators.js';

export async function updateUser(user: User, input: UpdateUserInput): Promise<User> {
  if (input.username && input.username !== user.username) {
    const existing = await UserModel.findOne({ where: { username: input.username } });
    if (existing) throw new ApiError(409, 'Username is already registered', 'USERNAME_EXISTS');
  }
  if (input.password) {
    const valid = await bcrypt.compare(input.currentPassword ?? '', user.passwordHash);
    if (!valid) throw new ApiError(401, 'Current password is incorrect', 'INVALID_CURRENT_PASSWORD');
    user.passwordHash = await bcrypt.hash(input.password, env.bcryptRounds);
  }
  if (input.username) user.username = input.username;
  if (input.password) {
    user.passwordHash = await bcrypt.hash( input.password, env.bcryptRounds );
  }
  return user.save();
}

export async function softDeleteUser(user: User): Promise<User> {
  user.deletedAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return user.save();
}

export async function blockUser(blockerId: string, blockedId: string): Promise<void> {
  if (blockerId === blockedId) {
    throw new ApiError(400, 'You cannot block yourself', 'CANNOT_BLOCK_SELF');
  }

  const targetUser = await UserModel.findOne({ where: { id: blockedId, deletedAt: null } });
  if (!targetUser) throw new ApiError(404, 'User not found', 'NOT_FOUND');

  const existing = await BlockModel.findOne({ where: { blockerId, blockedId } });
  if (existing) throw new ApiError(409, 'User already blocked', 'ALREADY_BLOCKED');

  await BlockModel.create({ blockerId, blockedId });
}

export async function unblockUser(blockerId: string, blockedId: string): Promise<void> {
  const block = await BlockModel.findOne({ where: { blockerId, blockedId } });
  if (!block) throw new ApiError(404, 'Block not found', 'NOT_FOUND');

  await block.destroy();
}
