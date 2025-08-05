'use client';

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/use-auth";

export function LogoutButton() {
  const { logout, loading } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const message = await logout();
      toast.success(message);
      router.push("/login");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <Button asChild onClick={handleLogout} disabled={loading} className="gap-2 cursor-pointer" variant={"ghost"}>
      <div>
        <LogOutIcon className="w-4 h-4" />
        {loading ? "Logging out..." : "Logout"}
      </div>
    </Button>
  );
}