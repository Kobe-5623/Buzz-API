import { z } from 'zod';

const password = z.string().min(8).max(72).regex(/[A-Za-z]/, 'Password must contain a letter').regex(/\d/, 'Password must contain a number');

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  password,
}).strict();

export const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1),
}).strict();

export const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()).optional(),
  password: password.optional(),
  currentPassword: z.string().min(1).optional(),
}).strict().refine((data) => Object.keys(data).some((key) => key !== 'currentPassword'), {
  message: 'At least one field must be updated',
}).refine((data) => !data.password || Boolean(data.currentPassword), {
  message: 'currentPassword is required to change the password',
  path: ['currentPassword'],
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
