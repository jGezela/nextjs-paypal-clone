"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

import { changePasswordAction } from "@/lib/actions/changePasswordAction";
import { changePasswordSchema } from "@/lib/schemas/changePasswordSchema";

export default function AcoountForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    setIsPending(true);
    const res = await changePasswordAction(values);

    if (res.success) {
      setIsPending(false);
      toast("Account password was cahnged!");
    } else {
      setIsPending(false);
      toast.error(res.error, {
        classNames: {
          toast: "!bg-destructive !text-white !border-0",
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 btn" disabled={isPending}>
          Change password
        </Button>
      </form>
    </Form>
  );
}
