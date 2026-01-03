import Image from "next/image";
import { ModeToggle } from "@/components/theme-provider";
import LogoImage from "@/assets/logo.png";
import { useRedirectAuthenticated } from "@/hooks/use-auth-guard";
import LanguageToggle from "@/components/language-toggle";
import { useTranslations } from "next-intl";

export default function AuthLayout({
  type,
  children,
}: {
  type: "login" | "signup";
  children: React.ReactNode[];
}) {
  useRedirectAuthenticated();
  const t = useTranslations("AuthLayout");

  return (
    <div className="bg-image min-h-screen flex flex-col p-4">
      <div className="flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold text-white text-shadow-lg">
          Experience
        </h1>
        <div className="flex gap-2">
          <LanguageToggle />
          <ModeToggle />
        </div>
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
        <h2 className="text-3xl font-bold mb-4">{t(type)}</h2>
        {...children}
      </div>
    </div>
  );
}
