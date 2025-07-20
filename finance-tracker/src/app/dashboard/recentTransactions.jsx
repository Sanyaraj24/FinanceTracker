"use client";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import useAuth from "../hook/useAuth";

const RecentTransactions = ({ accountTransactions }) => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //pagination states-
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(7);

  // Pagination calculations
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = accountTransactions?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    accountTransactions?.length / transactionsPerPage
  );

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
    if (!accountTransactions) return;
    setLoading(false);
    setTransactions(accountTransactions);
  }, [accountTransactions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#6f6dc6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-[#2d1e1e] rounded-lg">
        <p className="text-[#ff5252] font-medium">Error loading transactions</p>
        <p className="text-sm text-[#ff8a80] mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#181a24] rounded-xl shadow-sm border border-[#2d2f3a] overflow-hidden">
      <div className="p-4 border-b border-[#2d2f3a]">
        <h3 className="text-lg font-semibold text-white">
          Recent Transactions
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#2d2f3a]">
          <thead className="bg-[#232530]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#b8b8b8] uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#b8b8b8] uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#b8b8b8] uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#b8b8b8] uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#b8b8b8] uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#b8b8b8] uppercase tracking-wider"
              >
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#181a24] divide-y divide-[#2d2f3a]">
            {currentTransactions?.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-[#b8b8b8]"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              currentTransactions?.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-[#232530] transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b8b8]">
                    {new Date(txn.transaction_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {txn.description || "Untitled Transaction"}
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
                    {parseFloat(txn.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        txn.transaction_type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {txn.transaction_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b8b8]">
                    {txn.payment_method || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/**PAGINATION CODE */}
      {accountTransactions?.length > transactionsPerPage && (
        <div className="p-3 border-t border-[#2d2f3a] flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`text-sm font-medium px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-[#6f6dc6]/50 cursor-not-allowed"
                : "text-[#6f6dc6] hover:text-[#8b89d8] hover:bg-[#6f6dc6]/10"
            } transition-colors`}
          >
            Previous
          </button>

          <span className="text-sm text-[#b8b8b8]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`text-sm font-medium px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-[#6f6dc6]/50 cursor-not-allowed"
                : "text-[#6f6dc6] hover:text-[#8b89d8] hover:bg-[#6f6dc6]/10"
            } transition-colors`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
