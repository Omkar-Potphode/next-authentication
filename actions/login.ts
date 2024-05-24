"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = (values : z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields){
        return {
            error: "Invalid credentials"
        };
    };

    return {
        success: "You're all set! Lets's get"
    };
};