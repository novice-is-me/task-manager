"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterFormData } from "@/types/form.types";
import { Chrome, Github, Lock, LogIn, Mail, User } from "lucide-react";

const Page = () => {
  const [name, setName] = useState<RegisterFormData["name"]>("");
  const [email, setEmail] = useState<RegisterFormData["email"]>("");
  const [password, setPassword] = useState<RegisterFormData["password"]>("");
  const [confirmPassword, setConfirmPassword] =
    useState<RegisterFormData["confirmPassword"]>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <section className=" h-screen flex items-center justify-center bg-auth">
      <form
        onSubmit={handleSubmit}
        className=" border border-border p-8 rounded-lg w-full max-w-md space-y-5 bg-white shadow-xl"
      >
        {/* Title */}
        <div className=" text-center">
          <h3 className=" text-2xl font-bold">Create An Account</h3>
          <p className=" text-muted-foreground text-sm">
            Start your journey with us!
          </p>
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
        </div>
        {/* Options */}
        <div className="space-y-4">
          <FieldSeparator>Or Register with</FieldSeparator>
          <div className="space-y-2 mt-4">
            <Button variant="outline" className=" w-full py-6">
              <Chrome className="size-4" />
              Login with Google
            </Button>
            <Button variant="outline" className=" w-full py-6">
              <Github className="size-4" />
              Login with Github
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Page;
