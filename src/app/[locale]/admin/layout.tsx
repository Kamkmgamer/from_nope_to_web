"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Navbar, Footer } from "~/components/layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const dbUser = useQuery(
    api.users.getByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
      return;
    }

    if (isLoaded && user && dbUser) {
      if (dbUser.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [isLoaded, user, dbUser, router]);

  if (!isLoaded || !dbUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (dbUser.role !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen pt-24 pb-12">
        <div className="container-editorial">
          <div className="border-border mb-8 flex items-center gap-4 border-b pb-4">
            <h1 className="font-display text-2xl">Admin Panel</h1>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 font-mono text-xs uppercase">
              Authorized
            </span>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
