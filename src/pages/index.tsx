import { ModeToggle } from "@/components/theme-provider";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/assets/logo.png";

export default function Home() {
  return (
    <div className="bg-image min-h-screen flex flex-col p-4">
      <div className="flex justify-between items-center px-4 py-4">
        <h1>Experience</h1>
        <ModeToggle />
      </div>
      <div className="m-auto px-4 py-6 border rounded-3xl backdrop-blur bg-background/60 max-w-md md:max-w-lg w-full">
        <Image
          className="mx-auto"
          src={LogoImage}
          alt="logo"
          width={100}
          height={100}
        />
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                required
                className="bg-background/60 focus-visible:ring-primary h-10"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="bg-background/60 focus-visible:ring-primary h-10"
              />
              <Link href="/recover-password" className="hover:underline">
                forget you&#39;re password?
              </Link>
            </Field>
            <Field>
              <Button size="lg">Sign in</Button>
            </Field>
            <Field>
              <p className="text-center">
                Don&#39;t have an account?{" "}
                <Button variant="link">Sign up</Button>
              </p>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
