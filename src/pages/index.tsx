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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFields, loginSchema } from "@/schemas/login-schema";
import AuthLayout from "@/components/layout/auth-layout";
import { useAuthStore } from "@/store/auth-store";
import { ServerValidationError } from "@/types/server-validation-error";
import { getMessages } from "@/lib/utils";
import { useTranslations } from "next-intl";
import useAutoRtl from "@/hooks/use-auto-rtl";

export default function LoginPage() {
  useAutoRtl();

  const tCommon = useTranslations("Common");
  const tLogin = useTranslations("Login");
  const tAuthErrors = useTranslations("AuthErrors");
  const login = useAuthStore((state) => state.login);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async ({
    username,
    password,
  }) => {
    try {
      await login(username, password);
    } catch (err) {
      console.log(err);

      if (err instanceof ServerValidationError) {
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
    <AuthLayout type="login">
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
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
                <FieldDescription>
                  <Link href="/recover-password" className="hover:underline">
                    {tLogin("forgotPassword")}
                  </Link>
                </FieldDescription>
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
        form="login-form"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {tLogin("loginButton")}
      </Button>
      <p className="text-center">
        {tCommon("dontHaveAccount")} {""}
        <Button asChild variant="link">
          <Link href="/signup">{tLogin("signupLink")}</Link>
        </Button>
      </p>
    </AuthLayout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return { props: { messages: await getMessages(locale) } };
}
