"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router  = useRouter();
  const session = authClient.useSession();
  const user = session?.data?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="flex justify-center flex-col items-center mb-20 space-y-5">
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
        />
        <button onClick={() => router.push("/signIn")} className="bg-purple-600 hover:opacity-75 text-white px-[50px] py-[14px] rounded-lg">
          Account
        </button>

        {user && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md space-y-4">
            <div className="flex flex-col items-center space-y-4">
              {user.image && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-600">
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {user.name && (
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h2>
              )}
              {user.email && <p className="text-gray-600">{user.email}</p>}
              <button
                onClick={handleSignOut}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
