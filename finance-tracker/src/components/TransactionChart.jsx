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

export default function TransactionChart({ transactions }) {
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

        if (!Array.isArray(transactions)) {
          throw new Error("Invalid data format");
        }

        // Sort transactions by date in ascending order
        const sortedTransactions = [...transactions].sort(
          (a, b) => new Date(a.transaction_date) - new Date(b.transaction_date)
        );

        const formatted = sortedTransactions.map((tx) => ({
          date: new Date(tx?.transaction_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          amount: tx?.amount,
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
  }, [user, selectedRange, JSON.stringify(transactions)]);

  return (
    <div className="w-full h-[450px] p-6 pb-16 bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-[#6f6dc6]">📊</span> Spending Overview
        </h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="px-3 py-1.5 border border-[#6f6dc6]/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent text-white bg-[#181a24] transition-all"
        >
          {ranges.map((range) => (
            <option
              key={range.value}
              value={range.value}
              className="bg-[#1f2232]"
            >
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-white animate-pulse">Loading chart data...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-red-400">{error}</div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-white/70">No transaction data available</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#6f6dc6/20"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#ffffff"
              tick={{ fill: "#ffffff" }}
              tickMargin={10}
              label={{
                value: "Date",
                position: "insideBottomRight",
                offset: -10,
                fill: "#ffffff",
              }}
            />
            <YAxis
              stroke="#ffffff"
              tick={{ fill: "#ffffff" }}
              tickMargin={10}
              label={{
                value: "Amount (₹)",
                angle: -90,
                position: "insideLeft",
                fill: "#ffffff",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2232",
                border: "1px solid #6f6dc6",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#6f6dc6",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
              itemStyle={{
                color: "#ffffff",
                padding: "4px 0",
              }}
              formatter={(value) => [`₹${value}`, "Amount"]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6f6dc6"
              strokeWidth={3}
              dot={{
                r: 4,
                stroke: "#6f6dc6",
                strokeWidth: 2,
                fill: "#1f2232",
              }}
              activeDot={{
                r: 6,
                stroke: "#6f6dc6",
                strokeWidth: 2,
                fill: "#1f2232",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
