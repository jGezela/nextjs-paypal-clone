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
import { Textarea } from "@/components/ui/textarea";

import { sendMoneySchema } from "@/lib/schemas/sendMoneySchema";
import { sendMoneyAction } from "@/lib/actions/sendMoneyAction";

export default function SendMoneyForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof sendMoneySchema>>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      amount: 1.0,
      email: "",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof sendMoneySchema>) {
    setIsPending(true);
    const res = await sendMoneyAction(values);

    if (res.success) {
      toast("Money was sent!");
      form.reset();
      setIsPending(false);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    className="input pl-8"
                    value={
                      field.value?.toFixed
                        ? field.value.toFixed(2)
                        : field.value
                    }
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 btn w-full" disabled={isPending}>
          Send money
        </Button>
      </form>
    </Form>
  );
}
