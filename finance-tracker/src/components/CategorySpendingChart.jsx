"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "@/app/hook/useAuth";
import { useState, useEffect } from "react";

export const CategorySpendingChart = ({ transactions }) => {
  const { user } = useAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  // Distinct color palettes with better separation
  const EXPENSE_COLORS = [
    "#FF6B6B",
    "#FF8E8E",
    "#FFAAAA",
    "#FFC4C4", // Reds
    "#FFA07A",
    "#FFB347",
    "#FFD166",
    "#FFDD59", // Oranges/Yellows
    "#A5DD9B",
    "#83C5BE",
    "#68B0AB",
    "#4A9EA8", // Greens/Teals
  ];

  const INCOME_COLORS = [
    "#06D6A0",
    "#1B9AAA",
    "#2EC4B6",
    "#4CC9F0", // Teals/Blues
    "#4895EF",
    "#4361EE",
    "#3A0CA3",
    "#7209B7", // Blues/Purples
    "#B5179E",
    "#F72585",
    "#FF70A6",
    "#FF9B85", // Pinks/Peaches
  ];

  useEffect(() => {
    if (!transactions || !user?.uid) return;

    // Process transactions
    const processData = (type) => {
      const categoryMap = transactions
        .filter((t) => t.transaction_type === type)
        .reduce((acc, t) => {
          const category = t.category || `Uncategorized ${type}`;
          const amount = parseFloat(t.amount) || 0;
          acc[category] = (acc[category] || 0) + amount;
          return acc;
        }, {});

      return Object.entries(categoryMap)
        .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
        .filter((item) => item.value > 0)
        .sort((a, b) => b.value - a.value);
    };

    setExpenseData(processData("expense"));
    setIncomeData(processData("income"));
  }, [transactions, user]);

  // Custom label formatter
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-[#181a24] rounded-xl shadow-sm border border-[#2d2f3a] p-6">
      <h3 className="text-lg font-semibold text-white mb-6">
        Category Breakdown
      </h3>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Expense Chart */}
        <div className="flex-1">
          <h4 className="text-center font-medium text-[#FF6B6B] mb-4">
            Expenses
          </h4>
          {expenseData.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Amount"]}
                    contentStyle={{
                      background: "#2d2f3a",
                      borderColor: "#6f6dc6",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      color: "#ffffff",
                      fontSize: "12px",
                      paddingLeft: "20px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-[#b8b8b8]">No expense data available</p>
            </div>
          )}
        </div>

        {/* Income Chart */}
        <div className="flex-1">
          <h4 className="text-center font-medium text-[#06D6A0] mb-4">
            Income
          </h4>
          {incomeData.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {incomeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={INCOME_COLORS[index % INCOME_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Amount"]}
                    contentStyle={{
                      background: "#2d2f3a",
                      borderColor: "#6f6dc6",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      color: "#ffffff",
                      fontSize: "12px",
                      paddingLeft: "20px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-[#b8b8b8]">No income data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
