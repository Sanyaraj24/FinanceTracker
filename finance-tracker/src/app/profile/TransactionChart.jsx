"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useAuth from "@/app/hook/useAuth";

const ranges = [
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 1 Month", value: "1month" },
  { label: "Last 3 Months", value: "3months" },
  { label: "All Time", value: "all" },
];

export default function TransactionChart() {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRange, setSelectedRange] = useState("1month");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!user?.uid) return;

        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-transactions?user_id=${user.uid}&range=${selectedRange}`
        );

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        if (!Array.isArray(data.transactions)) {
          throw new Error("Invalid data format");
        }

        const formatted = data.transactions.map((tx) => ({
          date: tx.transaction_date,
          amount: tx.amount,
        }));

        setChartData(formatted);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, selectedRange]);

  return (
    <div className="w-full h-[350px] p-4 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Spending Overview</h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {ranges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-gray-500 text-sm">Loading chart...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">Error: {error}</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
