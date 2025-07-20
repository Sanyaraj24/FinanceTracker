"use client";

import { AccountCard } from "./AccountCard";
import useAuth from "@/app/hook/useAuth";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiCreditCard } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AccountsInfo = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user?.uid) return;

    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts?user_id=${user.uid}`
        );
        console.log("accounts info", res);
        if (!res.ok) throw new Error("Failed to fetch accounts");
        const data = await res.json();
        setAccounts(data || []);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setError("Failed to load accounts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [user?.uid]);

  const handleDelete = async (accountId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-account?account_id=${accountId}&user_id=${user?.uid}`,
        { method: "DELETE" }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to delete account");

      // success
      console.log("Deleted successfully:", result.message);
      toast.success("Deleted Successfully, Refresh to see Changes!");
      router.refresh();
      accounts?.filter((acc) => {
        return Number(acc.id) != Number(accountId);
      });
      // Optionally refresh or update UI
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-xl border border-gray-200 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
          <Link href="/">
            <button
              className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
              aria-label="Retry loading accounts"
            >
              Retry
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your Accounts</h2>
        <Link href="/add-accounts" passHref>
          <button
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md"
            aria-label="Add new account"
          >
            <FiPlus className="text-lg" />
            <span>Add Account</span>
          </button>
        </Link>
      </div>

      {accounts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiCreditCard className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No accounts found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first account
          </p>
          <Link href="/add-accounts" passHref>
            <button
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-md"
              aria-label="Add new account"
            >
              <FiPlus className="text-lg" />
              <span>Add Account</span>
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsInfo;
