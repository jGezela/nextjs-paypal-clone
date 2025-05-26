"use client"

import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema } from "@/lib/schemas/loginSchema";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsPending(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/dashboard" 
    });

    if(!res?.ok) {
      setIsPending(false);
      if (res?.error === "CredentialsSignin") {
        toast.error("Invalid credentials! Check your password or e-mail.", {
          classNames: {
            toast: '!bg-destructive !text-white !border-0',
          },
        });
      } else {
        toast.error("Something went wrong! Please try again later.", {
          classNames: {
            toast: '!bg-destructive !text-white !border-0',
          },
        });
      }
    } else {
      toast("Successfuly loged in! You wil be redirected to dashboard.");
      router.push("/dashboard");
    }
  }

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input type="email" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 btn" disabled={isPending}>Log in</Button>
      </form>
    </Form>
  );
}