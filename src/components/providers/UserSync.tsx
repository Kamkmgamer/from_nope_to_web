"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const upsertUser = useMutation(api.users.upsert);

  useEffect(() => {
    if (isLoaded && user) {
      const syncUser = async () => {
        try {
          await upsertUser({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress ?? "",
            fullName: user.fullName ?? user.firstName ?? "User",
            imageUrl: user.imageUrl,
          });
        } catch (error) {
          console.error("Failed to sync user to Convex:", error);
        }
      };

      void syncUser();
    }
  }, [isLoaded, user, upsertUser]);

  return null;
}
