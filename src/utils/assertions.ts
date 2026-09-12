import { User } from "../models/User.js";
import { User as UserModel } from "../models/index.js";
import { ApiError } from "./ApiError.js";

export function assertAuth(requestedUser: User | undefined): User {
  if (!requestedUser) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
  return requestedUser;
}

export async function assertUser(userId: string | string[] | undefined): Promise<User> {
  const id = Array.isArray(userId) ? userId[0] : userId;
  const targetUser = await UserModel.findByPk(id);
  if (!targetUser) throw new ApiError(404, 'User not found', 'USER_NOT_FOUND');
  return targetUser;
}