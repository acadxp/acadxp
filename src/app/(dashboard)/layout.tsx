import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const isAuthenticated = !!user && !!token;

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-1 p-8">{children}</main>
      <Footer />
    </div>
  );
}
