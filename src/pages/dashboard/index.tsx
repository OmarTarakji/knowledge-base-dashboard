import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useRedirectUnauthenticated } from "@/hooks/use-auth-guard";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  useRedirectUnauthenticated();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    console.log("logout");
    logout();
  };

  return (
    <div>
      <h1>{t("title")}</h1>
      <Button variant="destructive" onClick={handleLogout}>
        {t("logout")}
      </Button>
    </div>
  );
}
