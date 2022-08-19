import z from 'zod';

export const jwtPayloadSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().max(14),
  lastName: z.string().max(14),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email or password'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Invalid email or password'),
  }),
});

export type LoginSchemaInputs = z.infer<typeof loginSchema>['body'];
