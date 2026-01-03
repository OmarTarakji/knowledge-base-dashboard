import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

export default function LanguageToggle() {
  const t = useTranslations("Language");
  const router = useRouter();
  const { locale, asPath } = router;

  async function setLocale(locale: "en" | "ar") {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    await router.push(asPath, asPath, { locale: locale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe />
          <span className="sr-only">{t("changeLanguageSrOnly")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          onCheckedChange={() => setLocale("en")}
        >
          English
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "ar"}
          onCheckedChange={() => setLocale("ar")}
        >
          العربية
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
