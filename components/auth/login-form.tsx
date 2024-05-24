"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper"
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {

    const [isPending, setTransition ] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setSuccess("");
        setError("");

        setTransition(() => {
            login(values)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            });
        });
    };

    return (
        <CardWrapper
        headerLabel="Welcome Back !"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >

                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field} 
                                    placeholder="test@example.com"
                                    type="email"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field} 
                                    placeholder="******"
                                    type="password"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                    className="w-full"
                    type="submit"
                    disabled={isPending}
                    >
                        Login
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}