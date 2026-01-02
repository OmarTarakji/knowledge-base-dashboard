import { ModeToggle } from "@/components/theme-provider";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/assets/logo.png";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string("Username is required").min(1, "Username is required"),
  password: z
    .string("Password is required")
    .min(1, "Username is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFields = z.infer<typeof schema>;

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    console.log(data);
  };

  return (
    <div className="bg-image min-h-screen flex flex-col p-4">
      <div className="flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold text-white text-shadow-lg">
          Experience
        </h1>
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4 m-auto px-4 py-8 border rounded-3xl backdrop-blur bg-background/60 max-w-md md:max-w-lg w-full">
        <Image
          className="mx-auto"
          src={LogoImage}
          alt="logo"
          width={100}
          height={100}
          priority
        />
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
                    className="bg-background/60 focus-visible:ring-primary h-10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    className="bg-background/60 focus-visible:ring-primary h-10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    <Link href="/recover-password" className="hover:underline">
                      forget you&#39;re password?
                    </Link>
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="login-form"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
        <p className="text-center">
          Don&#39;t have an account?{" "}
          <Button asChild variant="link">
            <Link href="/signup">Sign up</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
