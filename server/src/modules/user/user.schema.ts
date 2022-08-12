import z from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Not a valid email'),

      firstName: z
        .string({
          required_error: 'First name is required',
        })
        .regex(/^[a-zA-Z ]{2,14}$/, {
          message: 'first name must be beetween 2 and 14 characters',
        }),

      lastName: z
        .string({
          required_error: 'Last name is required',
        })
        .regex(/^[a-zA-Z ]{2,14}$/, {
          message: 'last name must be beetween 2 and 14 characters',
        }),

      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(6, 'Password is too short - should be min 6 chars')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/, {
          message:
            '6 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.Allowed special characters: !@#$%',
        }),

      confirmPassword: z.string({
        required_error: 'Password confirmation is required',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
