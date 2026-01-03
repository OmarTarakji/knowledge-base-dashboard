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
import { useTranslations } from "next-intl";
import { getMessages } from "@/lib/utils";
import useAutoRtl from "@/hooks/use-auto-rtl";

export default function SignupPage() {
  useAutoRtl();
  const signup = useAuthStore((state) => state.signup);
  const tCommon = useTranslations("Common");
  const tSignup = useTranslations("Signup");
  const tAuthErrors = useTranslations("AuthErrors");

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignupFields>({ resolver: zodResolver(signupSchema) });

  const onSubmit: SubmitHandler<SignupFields> = async (data) => {
    try {
      await signup(data);
    } catch (err) {
      console.log(err);
      if (err instanceof ServerValidationError) {
        console.log(err.errors);
        Object.entries(err.errors).forEach(([field, messageKey]) => {
          const translatedMessage = tAuthErrors(String(messageKey));
          setError(field as keyof LoginFields, {
            type: "server",
            message: translatedMessage,
          });
        });
        return;
      }

      setError("root", {
        message: tCommon("unexpectedError"),
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
                <FieldLabel htmlFor={field.name}>
                  {tCommon("username")}
                </FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={tCommon("usernamePlaceholder")}
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
                <FieldLabel htmlFor={field.name}>{tCommon("email")}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder={tCommon("emailPlaceholder")}
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
                <FieldLabel htmlFor={field.name}>
                  {tCommon("password")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder={tCommon("passwordPlaceholder")}
                  className="bg-background/60 focus-visible:ring-primary h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>{tCommon("passwordHint")}</FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  {tCommon("confirmPassword")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder={tCommon("confirmPasswordPlaceholder")}
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
        {tSignup("signupButton")}
      </Button>
      <p className="text-center">
        {tCommon("alreadyRegistered")} {""}
        <Button asChild variant="link">
          <Link href="/">{tSignup("signinLink")}</Link>
        </Button>
      </p>
    </AuthLayout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return { props: { messages: await getMessages(locale) } };
}
