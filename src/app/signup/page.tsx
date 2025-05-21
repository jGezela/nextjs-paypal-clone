import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SignupForm from "@/components/signupForm";

export default function SignupPage() {
  return (
    <section className="py-5 flex justify-center items-center min-h-full">
      <Card className="mx-3 max-w-[460px] w-full">
        <CardHeader>
          <CardTitle className="flex flex-col justify-center items-center">
            <Image src="/paypal-mark.svg" alt="PayPal logo" width={40} height={40} />
            <h1 className="mt-2 text-2xl font-bold">Sign up</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="block space-y-5">
          <div className="py-2 relative">
            <Separator />
            <p className="absolute left-[45%] top-[-6px] bg-white w-10 text-center text-gray-600">or</p>
          </div>
          <Link href="/login" className="w-full">
            <Button className="btn btn--outline">Log in</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}