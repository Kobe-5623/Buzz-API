import type { User } from '../models/User.js';

export async function forceDeleteUser(user: User): Promise<User> {
  user.deletedAt = new Date();
  return user.save();
}

export async function restoreUser(user: User): Promise<User> {
  user.deletedAt = null;
  return user.save();
}

