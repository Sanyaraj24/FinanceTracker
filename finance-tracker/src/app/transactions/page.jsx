"use client";

import { useState, useEffect } from "react";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AddTransactionForm from "./AddTransactionForm";
import ReceiptScanner from "./ReceiptScanner";
import RecentTransactions from "./RecentTransactions";
import useAuth from "../hook/useAuth";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchUserTransactions(user.uid);
      } else {
        setUserId(null);
        setTransactions([]);
      }
    });
    return () => unsubscribe();
  }, []);
  //fetch all transactions-
  const fetchUserTransactions = async (userId) => {
    try {
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-transactions?user_id=${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data?.transactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  //add a transaction--
  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  //CALCULATIONS FOR MY BALANCE,INCOME,EXPENSE
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });
  useEffect(() => {
    console.log("transactions", transactions);
    if (!transactions || transactions?.length === 0) return;

    const calculated = transactions?.reduce(
      (acc, transaction) => {
        const amount = parseFloat(transaction.amount) || 0;

        if (transaction.transaction_type === "income") {
          acc.income += amount;
        } else if (transaction.transaction_type === "expense") {
          acc.expenses += amount;
        }

        acc.balance = acc.income - acc.expenses;
        return acc;
      },
      { income: 0, expenses: 0, balance: 0 }
    );

    setSummary({
      income: parseFloat(calculated.income.toFixed(2)),
      expenses: parseFloat(calculated.expenses.toFixed(2)),
      balance: parseFloat(calculated.balance.toFixed(2)),
    });
  }, [transactions]);
  //LOADER
  if (loading) {
    return (
      <div className="min-h-screen bg-[#181a24] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f6dc6]"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#181a24] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header and Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#6f6dc6]">
              Transactions
            </h1>
            <p className="text-[#6f6dc6]/80 mt-1">
              Track and manage your financial transactions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setModalType("manual");
                setShowModal(true);
              }}
              className="flex items-center justify-center gap-2 bg-[#6f6dc6] hover:bg-[#7d7bd3] text-[#181a24] px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Transaction
            </button>
            <button
              onClick={() => {
                setModalType("scan");
                setShowModal(true);
              }}
              className="flex items-center justify-center gap-2 bg-[#6f6dc6]/10 hover:bg-[#6f6dc6]/20 text-[#6f6dc6] px-4 py-2 rounded-lg transition-colors border border-[#6f6dc6]/30 shadow-sm hover:shadow-md"
            >
              <FiCamera className="text-lg" />
              Scan Receipt
            </button>
          </div>
        </div>

        {/* Transactions Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 p-4">
            <h3 className="text-[#6f6dc6]/80 text-sm font-medium">
              Total Balance
            </h3>
            <p className="text-2xl font-bold text-white mt-1">
              ₹{Math.abs(summary.balance).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 p-4">
            <h3 className="text-[#6f6dc6]/80 text-sm font-medium">
              Total Income
            </h3>
            <p className="text-2xl font-bold text-green-400 mt-1">
              ₹{summary.income.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 p-4">
            <h3 className="text-[#6f6dc6]/80 text-sm font-medium">
              Total Expenses
            </h3>
            <p className="text-2xl font-bold text-red-400 mt-1">
              ₹{summary.expenses.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Modal for Add Transaction or Receipt Scan */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 shadow-lg w-full max-w-2xl">
              <div className="p-6">
                {modalType === "manual" ? (
                  <AddTransactionForm
                    userId={userId}
                    onTransactionAdded={handleAddTransaction}
                    onClose={() => setShowModal(false)}
                  />
                ) : (
                  <ReceiptScanner
                    onScanComplete={handleAddTransaction}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
