import { z, ZodType } from 'zod';

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

// If you don't use z.infer<typeof signUpSchema>, you can do it like with ZodType<FormData>
// export const signUpSchema: ZodType<FormData> = z
export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, 'Password must be at least 10 characters'),
    confirmPassword: z.string(),
  })
  // Very smart way to do combine validation!!!
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
