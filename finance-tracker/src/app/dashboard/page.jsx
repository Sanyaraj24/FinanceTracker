"use client";

import { useEffect, useMemo, useState } from "react";
import AccountsInfo from "./accounts-section/AccountsInfo";
import RecentTransactions from "./recentTransactions";
import TransactionChart from "@/components/TransactionChart";
import useAuth from "../hook/useAuth";
import { CategorySpendingChart } from "@/components/CategorySpendingChart";
import Link from "next/link";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const { user } = useAuth();

  //fetch all accounts
  useEffect(() => {
    if (!user?.uid) return;

    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts?user_id=${user.uid}`
        );

        if (!res.ok) throw new Error("Failed to fetch accounts");
        const data = await res.json();
        setAccounts(data || []);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
      }
    };

    fetchAccounts();
  }, [user?.uid]);

  //fetch transaction of particular account
  useEffect(() => {
    if (!user?.uid || !selectedAccountId) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-account-transactions?user_id=${user?.uid}&account_id=${selectedAccountId}`
        );
        const data = await res.json();
        console.log("account transactions data => ", data);
        setTransactions(data?.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, [user?.uid, selectedAccountId]);

  const safeAccounts = Array.isArray(accounts) ? accounts : [];
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const income = useMemo(() => {
    return safeTransactions
      .filter(
        (tx) =>
          tx?.transaction_type === "income" &&
          new Date(tx?.transaction_date).getMonth() === currentMonth &&
          new Date(tx?.transaction_date).getFullYear() === currentYear
      )
      .reduce((sum, tx) => sum + (tx?.amount || 0), 0);
  }, [safeTransactions, currentMonth, currentYear]);

  const expense = useMemo(() => {
    return safeTransactions
      .filter(
        (tx) =>
          tx?.transaction_type === "expense" &&
          new Date(tx?.transaction_date).getMonth() === currentMonth &&
          new Date(tx?.transaction_date).getFullYear() === currentYear
      )
      .reduce((sum, tx) => sum + (tx?.amount || 0), 0);
  }, [safeTransactions, currentMonth, currentYear]);

  const budgetUsed = budget > 0 ? Math.min((expense / budget) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-[#181a24] p-10 max-w-full mx-auto space-y-6">
      <div className="px-2 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6f6dc6]">
          Dashboard
        </h1>
      </div>
      {/* Account Selector */}

      <div>
        <label className="block mb-2 text-sm font-medium text-[#6f6dc6]">
          Select Account:
        </label>
        <select
          value={selectedAccountId || ""}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="border border-[#6f6dc6]/30 bg-[#1f2232] text-white rounded-lg px-4 py-2.5 w-full max-w-md focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
        >
          <option value="" disabled>
            Please select an account to view graph
          </option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.bank_name})
            </option>
          ))}
        </select>
      </div>
      <div className="chart p-10">
        <TransactionChart transactions={transactions} />
      </div>
      <CategorySpendingChart transactions={transactions} />
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card
          title="Total Balance"
          value={`₹${(income - expense).toLocaleString("en-IN")}`}
          icon="💰"
          accent="purple"
        />
        <Card
          title="Income (This Month)"
          value={`₹${income.toLocaleString("en-IN")}`}
          icon="↑"
          accent="green"
        />
        <Card
          title="Expense (This Month)"
          value={`₹${expense.toLocaleString("en-IN")}`}
          icon="↓"
          accent="red"
        />
      </div>

      {/* Budget Progress */}
      {/* <div className="bg-[#1f2232] rounded-xl p-5 border border-[#6f6dc6]/20">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-[#6f6dc6]">Budget Usage</h3>
          <span className="text-sm font-medium text-[#6f6dc6]">
            ₹{expense.toLocaleString("en-IN")} of ₹
            {budget.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="w-full bg-[#6f6dc6]/20 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-[#6f6dc6] to-[#8a88d3] h-2.5 rounded-full"
            style={{ width: `${budgetUsed}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-[#6f6dc6]/70">0%</span>
          <span className="text-xs font-medium text-[#6f6dc6]">
            {budgetUsed.toFixed(1)}%
          </span>
          <span className="text-xs text-[#6f6dc6]/70">100%</span>
        </div>
      </div> */}

      {/* Recent Transactions */}
      <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#6f6dc6]/20">
          <h3 className="font-medium text-[#6f6dc6]">Recent Transactions</h3>
        </div>
        <RecentTransactions accountTransactions={transactions} />
      </div>

      {/* Action Buttons */}

      <div className="flex flex-wrap gap-3">
        <Link href="/transactions">
          <button className="bg-[#6f6dc6] hover:bg-[#7d7bd3] text-[#181a24] px-4 py-2.5 rounded-lg text-sm font-medium shadow transition-colors">
            + Add Transaction
          </button>
        </Link>
        {/* <button className="bg-[#6f6dc6]/20 hover:bg-[#6f6dc6]/30 text-[#6f6dc6] px-4 py-2.5 rounded-lg text-sm font-medium shadow transition-colors border border-[#6f6dc6]/30">
          📊 Set Budget
        </button> */}
      </div>

      <AccountsInfo />
    </div>
  );
}

function Card({ title, value, icon, accent = "purple" }) {
  const accentColors = {
    purple: {
      bg: "bg-[#6f6dc6]/20",
      text: "text-[#6f6dc6]",
    },
    green: {
      bg: "bg-green-500/20",
      text: "text-green-500",
    },
    red: {
      bg: "bg-red-500/20",
      text: "text-red-500",
    },
  };

  return (
    <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 p-5 hover:transform hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-[#6f6dc6]/70 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <span
          className={`text-xl p-2 rounded-lg ${accentColors[accent].bg} ${accentColors[accent].text}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}
