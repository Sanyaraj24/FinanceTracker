"use client";

import { auth } from "@/app/config/firebase";
import useAuth from "@/app/hook/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.log("Error while logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#181a24] py-4 sticky top-0 z-50 border-b border-[#2d2f3a]">
        <div className="max-w-6xl mx-auto px-4 text-[#6f6dc6]">Loading...</div>
      </div>
    );
  }

  return (
    <nav className="bg-[#181a24] shadow-sm sticky top-0 z-50 border-b border-[#2d2f3a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-white hover:text-[#6f6dc6]/80 transition-colors"
            >
              BachatBuddy
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex sm:space-x-6">
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-[#6f6dc6] px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#6f6dc6]/10"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/transactions"
                    className="text-white/80 hover:text-[#6f6dc6] px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#6f6dc6]/10"
                  >
                    Transactions
                  </Link>
                  {/* <Link
                    href="/budgets"
                    className="text-white/80 hover:text-[#6f6dc6] px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#6f6dc6]/10"
                  >
                    Budgets
                  </Link> */}
                </div>
                <div className="hidden sm:flex sm:items-center gap-4 ml-4">
                  <Link
                    href="/profile"
                    className="p-2 rounded-full hover:bg-[#6f6dc6]/20 transition-colors"
                  >
                    <FiUser className="h-5 w-5 text-[#6f6dc6]" />
                  </Link>
                  <button
                    className="bg-[#6f6dc6] hover:bg-[#8b89d8] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/register"
                className="bg-[#6f6dc6] hover:bg-[#8b89d8] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
