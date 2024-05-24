import * as z from "zod";

{/*Schema for Login Form */}
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(1,{
        message: "Password is required!"
    })
})

{/*Schema for Register Form */}
export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message: "Name is Required!"
    }),
    email: z.string().email({
        message: "Email is Required!"
    }),
    password: z.string().min(6,{
        message: "Password is required!"
    })
})