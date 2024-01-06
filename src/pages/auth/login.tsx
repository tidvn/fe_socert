import Link from "next/link"

import { Icons } from "@/components/icons"
import { cn } from "@/utils/cn"
import { UserAuthForm } from "@/components/app/auth/user-auth-form"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status]);
  if (status === "authenticated") {
    return;
  }



  return (<>
    <div className="min-h-screen">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Connect wallet to sign in to your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {/* <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link> */}
          </p>
        </div>
      </div>
    </div>
  </>
  )
}