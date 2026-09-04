import { z } from 'zod';

const username = z.string().min(3).max(20).regex(/^[A-Za-z0-9_.-]$/, 'Username may only contain letters, numbers, underscores, periods, and dashes').regex(/[A-Za-z]/, 'Username must contain a letter');
const password = z.string().min(8).max(72).regex(/[A-Za-z]/, 'Password must contain a letter').regex(/\d/, 'Password must contain a number');

export const signupSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  middleName: z.string().trim().min(2).max(100).optional(),
  surname: z.string().trim().min(2).max(100),
  studentId: z.string().trim()
        .regex(/^\d{2}-\d{4}$/),
  course: z.enum(["BSCS", "BSBA", "BSA", "BSTM", "BSHM", "BSED"]),
  email: z.string().trim().email().max(255)
        .regex(/^[A-Za-z]+\.[A-Za-z]+@collegeofmaryimmaculate\.edu\.ph$/i,
          'Email must follow the format surname.firstname@collegeofmaryimmaculate.edu.ph'
        )
        .transform((value) => value.toLowerCase()),
  username,
  password,
  confirmPassword: z.string().min(1),
})
.strict()
.refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1),
}).strict();

export const updateUserSchema = z.object({
  username: username.optional(),
  currentPassword: z.string().min(1).optional(),
  password: password.optional(),
  confirmPassword: z.string().min(1).optional(),
}).strict().refine((data) => Object.keys(data)
        .some((key) => key !== 'currentPassword' && key !== 'confirmPassword'), {
  message: 'At least one field must be updated',
}).refine((data) => !data.password || Boolean(data.currentPassword), {
  message: 'currentPassword is required to change the password',
  path: ['currentPassword'],
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

