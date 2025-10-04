import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .trim(),

    email: z
      .string()
      .email("Invalid email format")
      .trim(),

    gender: z.enum(["Male", "Female"], {
      message: "Gender must be either Male or Female",
    }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .trim(),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .trim(),
});

  // Schema for Change password form
// export const changePasswordSchema = z
//   .object({
//     currentPassword: z
//       .string()
//       .min(8, "Current password must be at least 8 characters."),
//     newPassword: z
//       .string()
//       .min(8, "New password must be at least 8 characters."),
//     confirmPassword: z
//       .string()
//       .min(8, "Confirm password must be at least 8 characters."),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
//   });

  // Schema for forgot password form
  export const ForgetPasswordSchema = z.object({
    email: z.string().email({ message: "Kindly provide a valid email" })
  })

  // Schema for reset password form
  export const ResetPasswordSchema = z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });


    export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

  export type changePasswordType = z.infer<typeof changePasswordSchema>;
  export type ResetType = z.infer<typeof ResetPasswordSchema>;
  export type RegisterType = z.infer<typeof RegisterSchema>;
  export type LoginType = z.infer<typeof LoginSchema>;
  export type ForgetPasswordType = z.infer<typeof ForgetPasswordSchema>;
