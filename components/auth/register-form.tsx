"use client";

import * as z from "zod";
import { CardWrapper } from '@/components/auth/card-wrapper'
import { 
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage,
    FormLabel,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";

export const RegisterForm = () => {

    const [isPending, setTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values) => {
        setSuccess("");
        setError("");

        register(values)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        });
    };

  return (
    <CardWrapper
    headerLabel='Create an account'
    backButtonLabel='Already have a account'
    backButtonHref='/auth/login'
    showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6" 
            >
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                placeholder="Jhon Doe"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

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
                                placeholder="jhondoe@gmail.com"
                                type="email"
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
                >
                    Create an account
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
