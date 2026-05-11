"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Chrome, Github, Lock, LogIn, Mail } from "lucide-react";
import type { LoginFormData } from "@/types/form.types";
import { authWithGoogle, loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const Page = () => {
  const [email, setEmail] = useState<LoginFormData["email"]>("");
  const [password, setPassword] = useState<LoginFormData["password"]>("");
  const [confirmPassword, setConfirmPassword] =
    useState<LoginFormData["confirmPassword"]>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);

      console.log("Logged in user:", user);
      router.push("/");

      toast.success(`Welcome back, ${user.email}!`, {
        position: "top-right",
      });
      return user;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const { user, isNewUser } = await authWithGoogle();

      // Make sure to handle the case where user is not yet registered in Firestore
      if (isNewUser) {
        await user.delete();
        sessionStorage.setItem(
          "flash_message",
          "Please create an account first.",
        );
        router.push("/register");
        toast.error("Please create an account first.", {
          position: "top-right",
        });
        return;
      } else {
        console.log("Google logged in user:", user);
        router.push("/");
        toast.success(`Welcome back, ${user.email}!`, {
          position: "top-right",
        });
        return user;
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <section className=" h-screen flex items-center justify-center bg-auth">
      <form
        onSubmit={handleLogin}
        className=" border border-border p-8 rounded-lg w-full max-w-md space-y-5 bg-white shadow-xl"
      >
        {/* Title */}
        <div className=" text-center">
          <h3 className=" text-2xl font-bold">Welcome Back!</h3>
          <p className=" text-muted-foreground text-sm">
            Enter your credentials to access your account.
          </p>
        </div>
        {/* Inputs */}
        <div className=" space-y-4">
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-9"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Field>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="pl-9"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Field>
            <Field>
              <FieldLabel>Confirm</FieldLabel>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="pl-9"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </Field>
          </div>

          <Button
            className="w-full py-6"
            disabled={!email || !password || !confirmPassword}
          >
            <LogIn className="size-4" />
            Login
          </Button>
          <Link className=" text-blue-400 text-sm underline" href="/register">
            {"Don't have an account? Create an account"}
          </Link>
        </div>
        {/* Options */}
        <div className="space-y-4">
          <FieldSeparator>Or Login with</FieldSeparator>
          <div className="space-y-2 mt-4" onClick={handleGoogleLogin}>
            <Button variant="outline" className=" w-full py-6">
              <Chrome className="size-4" />
              Google
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Page;
