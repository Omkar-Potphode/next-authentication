"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = ( values : z.infer<typeof RegisterSchema>) => {
    
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields) {
        return {
            error : "Invalid credentials"
        };
    };

    return {
        success : "Registration complete. Let's get started!"
    };
};