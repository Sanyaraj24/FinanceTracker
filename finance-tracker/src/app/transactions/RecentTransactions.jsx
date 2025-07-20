"use client";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "../hook/useAuth";
import { auth } from "../config/firebase";

const RecentTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("entered the useEffec with userId,", userId);
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-transactions?user_id=${userId}`
        );
        console.log("result is => ", res);
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        console.log("res.json data is ", data);
        console.log("transaction data:", data);
        if (data.success) {
          setTransactions(data.transactions);
        } else {
          throw new Error(data.error || "Failed to load transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#6f6dc6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-[#ffebee] rounded-lg">
        <p className="text-[#d32f2f] font-medium">Error loading transactions</p>
        <p className="text-sm text-[#b71c1c] mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#181a24] rounded-xl shadow-sm border border-[#2d2f3a] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#2d2f3a]">
          <thead className="bg-[#6f6dc6]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#181a24] divide-y divide-[#2d2f3a]">
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#232530]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e2e2e2]">
                    {new Date(txn.transaction_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {txn.description || "Untitled"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b8b8]">
                    {txn.category || "-"}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      txn.transaction_type === "income"
                        ? "text-[#4caf50]"
                        : "text-[#f44336]"
                    }`}
                  >
                    {txn.transaction_type === "income" ? "+" : "-"}₹
                    {parseFloat(txn.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        txn.transaction_type === "income"
                          ? "bg-[#e8f5e9] text-[#2e7d32]"
                          : "bg-[#ffebee] text-[#c62828]"
                      }`}
                    >
                      {txn.transaction_type.charAt(0).toUpperCase() +
                        txn.transaction_type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b8b8]">
                    {txn.payment_method || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-[#b8b8b8]"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
