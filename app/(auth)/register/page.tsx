"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterFormData } from "@/types/form.types";
import { Chrome, Lock, LogIn, Mail, User } from "lucide-react";
import { authWithGoogle, registerUser } from "@/lib/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

const Page = () => {
  const [name, setName] = useState<RegisterFormData["name"]>("");
  const [email, setEmail] = useState<RegisterFormData["email"]>("");
  const [password, setPassword] = useState<RegisterFormData["password"]>("");
  const [confirmPassword, setConfirmPassword] =
    useState<RegisterFormData["confirmPassword"]>("");

  const [flash, setFlash] = useState(() => {
    const msg = sessionStorage.getItem("flash_message");

    if (msg) {
      sessionStorage.removeItem("flash_message");
      return msg;
    }

    return "";
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password);

      // Insert in the firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || name,
          created_at: new Date(),
        });

        return user;
      } catch (error) {
        console.error("Error adding user to Firestore:", error);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleGoogleRegister = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const { user, isNewUser } = await authWithGoogle();

      if (!isNewUser) {
        console.error("User already exists. Please login instead.");
        return;
      }

      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || name,
          created_at: new Date(),
        });
      } catch (error) {
        console.error("Error adding Google user to Firestore:", error);
      }

      return user;
    } catch (error) {
      console.error("Google registration failed:", error);
    }
  };

  return (
    <section className=" h-screen flex items-center justify-center bg-auth">
      <form
        onSubmit={handleRegister}
        className=" border border-border p-8 rounded-lg w-full max-w-md space-y-5 bg-white shadow-xl"
      >
        {/* Title */}
        <div className=" text-center">
          <h3 className=" text-2xl font-bold">Create An Account</h3>
          <p className=" text-muted-foreground text-sm">
            Start your journey with us!
          </p>
          {flash && (
            <div className=" mt-4 p-3 bg-red-100 text-red-700 rounded">
              {flash}
            </div>
          )}
        </div>
        {/* Inputs */}
        <div className=" space-y-4">
          <Field>
            <FieldLabel>Full Name</FieldLabel>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Enter your name"
                className="pl-9"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Field>
          <Field>
            <FieldLabel>Email Address</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
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

          <Button className=" w-full py-6">
            <LogIn className="size-4" />
            Register
          </Button>
          <Link className=" text-blue-400 text-sm underline" href="/login">
            Already have an account?
          </Link>
        </div>
        {/* Options */}
        <div className="space-y-4">
          <FieldSeparator>Or Register with</FieldSeparator>
          <div className="space-y-2 mt-4" onClick={handleGoogleRegister}>
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
