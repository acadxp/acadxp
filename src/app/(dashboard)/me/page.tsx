"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
// import { useEffect } from "react";

const MePage = () => {
  const { data } = authClient.useSession(); // { data}
  //   const { data: session, isPending: sessionLoading } = authClient.useSession();
  //   const { data, isLoading, error } = useQuery({
  //     queryKey: ["me", sessionData?.user.id],
  //     queryFn: async () => {
  //       const data = await getMe(
  //         sessionData.data?.user.id!,
  //         sessionData?.data?.session.token!
  //       );
  //       return data;
  //     },
  //     enabled: !!sessionData.data?.user,
  //   });

  //   useEffect(() => {
  //     if (data) {
  //       console.log("User Data:", data);
  //     }
  //   }, [data]);
  console.log("Session Data:", data);
  return <div className="text-white">Me Page - Work in Progress</div>;
  //   if (isLoading) return <p className="text-white">Loading session...</p>;
  //   if (!sessionData) return <p className="text-white">Not authenticated</p>;

  //   return (
  //     <>
  //       <h1 className="text-3xl font-bold text-white mb-4">My Profile</h1>
  //       <p className="text-white">Welcome, {sessionData?.data?.user.name}</p>
  //       <div>
  //         {isLoading && <p className="text-white">Loading profile data...</p>}
  //       </div>
  //       {data && (
  //         <pre className="text-white">{JSON.stringify(data, null, 2)}</pre>
  //       )}
  //       {error && <p className="text-red-500">Error loading profile</p>}
  //     </>
  //   );
};
export default MePage;
