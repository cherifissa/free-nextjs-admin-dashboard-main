"use client";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function Profile() {
   const router = useRouter();
  
    useEffect(() => {
      // Check if the user is authenticated
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
  
      if (!token || !user) {
        // Redirect to sign-in page if not authenticated
        router.push("/signin");
      }
    }, [router]);
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          {/* <UserAddressCard /> */}
        </div>
      </div>
    </div>
  );
}
