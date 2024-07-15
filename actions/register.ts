"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUSerByEmail } from "@/data/user";
export const register = async ( values : z.infer<typeof RegisterSchema>) => {
    
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields) {
        return {
            error : "Invalid credentials"
        };
    };

    const {email, password, name} = validatedFields.data;
    const hashedPassword =  await bcrypt.hash(password, 10);

    const existingUser = await getUSerByEmail(email);

    if(existingUser){
        return {
            error: "Email Already in use!"
        }
    };

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        },
    });

    //Todo: create a send verification token email 

    return {
        success : "Registration complete. Let's get started!"
    };
};