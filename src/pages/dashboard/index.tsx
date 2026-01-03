import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useRedirectUnauthenticated } from "@/hooks/use-auth-guard";

export default function DashboardPage() {
  useRedirectUnauthenticated();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    console.log("logout");
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
