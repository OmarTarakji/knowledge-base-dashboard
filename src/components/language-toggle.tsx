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

export default function LanguageToggle() {
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
          <span className="sr-only">Change Language</span>
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
          عربي
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
