import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import LoginForm from "@/components/loginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <section className="flex justify-center items-center h-full">
      <Card className="max-w-[460px] w-full">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <Image src="/paypal-mark.svg" alt="PayPal logo" width={40} height={40} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <Link href="/register" className="w-full">
            <Button className="btn">Sign up</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}