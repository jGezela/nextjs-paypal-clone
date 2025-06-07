"use client";

import { toast } from "sonner";
import { useState } from "react";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AccountForm from "@/components/forms/accountForm";

import { deleteAccountAction } from "@/lib/actions/deleteAcountAction";

export default function AccountPage() {
  const [isPending, setIsPending] = useState(false);
  async function onDeleteBtnClick() {
    const res = await deleteAccountAction();
    if (res.success) {
      toast("Your account was removed! You will be logged out.");
      setIsPending(false);
      signOut();
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
    <section className="w-full">
      <header className="mb-5 flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold">Account</h1>
      </header>
      <div className="max-w-[512px]">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and your balance will be lost!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() => onDeleteBtnClick()}
                disabled={isPending}
              >
                I'm sure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AccountForm />
      </div>
    </section>
  );
}
