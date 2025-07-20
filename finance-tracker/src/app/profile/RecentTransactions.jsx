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
      if (!userId) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-transactions?user_id=${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Error loading transactions</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Your transactions will appear here
            </p>
          </div>
        ) : (
          transactions.map((txn) => (
            <div
              key={txn.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        txn.transaction_type === "income"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <h4 className="font-medium text-gray-800 truncate">
                      {txn.description ||
                        txn.category ||
                        "Untitled Transaction"}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 space-x-3">
                    <span>
                      {new Date(txn.transaction_date).toLocaleDateString()}
                    </span>
                    {txn.payment_method && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {txn.payment_method}
                      </span>
                    )}
                  </div>
                  {txn.notes && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {txn.notes}
                    </p>
                  )}
                </div>
                <span
                  className={`text-right font-medium ${
                    txn.transaction_type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {txn.transaction_type === "income" ? "+" : "-"}₹
                  {parseFloat(txn.amount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {transactions.length > 0 && (
        <div className="p-3 border-t border-gray-100 text-center">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
