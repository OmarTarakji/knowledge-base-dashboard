import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SignupFields, signupSchema } from "@/schemas/signup-schema";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginFields } from "@/schemas/login-schema";
import { ServerValidationError } from "@/types/server-validation-error";
import { useAuthStore } from "@/store/auth-store";

export default function SignupPage() {
  const signup = useAuthStore((state) => state.signup);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFields> = async (data) => {
    try {
      await signup(data);
    } catch (err) {
      console.log(err);
      if (err instanceof ServerValidationError) {
        console.log(err.errors);
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field as keyof LoginFields, {
            type: "server",
            message,
          });
        });
        return;
      }

      setError("root", {
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <AuthLayout type="signup">
      <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
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
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="email@example.com"
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
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter a password"
                  className="bg-background/60 focus-visible:ring-primary h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  Choose a strong password with symbols and numbers.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
                  className="bg-background/60 focus-visible:ring-primary h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      {errors.root && (
        <p className="text-destructive text-center">{errors.root.message}</p>
      )}
      <Button
        type="submit"
        form="signup-form"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        Sign up
      </Button>
      <p className="text-center">
        Already registered?{" "}
        <Button asChild variant="link">
          <Link href="/">Sign in</Link>
        </Button>
      </p>
    </AuthLayout>
  );
}
