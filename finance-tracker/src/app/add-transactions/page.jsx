"use client";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addTransaction } from "../utils/addTransaction";

export default function Page() {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const categories = [
    "Food & Dining",
    "Groceries",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Personal Care",
    "Gifts",
    "Salary",
    "Freelance",
    "Investments",
    "Rental Income",
    "Other",
  ];

  // Get user ID on auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Initialize formData only when userId is ready
  useEffect(() => {
    if (!userId) return;

    setFormData({
      user_id: userId,
      account_id: "",
      amount: "",
      description: "",
      category: "",
      transaction_type: "expense",
      payment_method: "cash",
      transaction_date: new Date().toISOString().split("T")[0],
      notes: "",
      reference_number: "",
    });
  }, [userId]);

  // Fetch accounts
  useEffect(() => {
    if (!userId) return;

    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts?user_id=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const data = await response.json();
        setAccounts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addTransaction(formData);
      if (data.success) {
        setMessage("Transaction added successfully!");
        setFormData((prev) => ({
          ...prev,
          amount: "",
          description: "",
          category: "",
          notes: "",
          reference_number: "",
        }));
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error adding transaction");
    }
  };

  if (!formData) return <p className="p-4">Initializing...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Add New Transaction
      </h2>

      {message && (
        <p className="mb-4 p-3 text-sm text-blue-600 bg-blue-50 rounded-md">
          {message}
        </p>
      )}
      {loading && <p className="text-gray-500">Loading accounts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Account
          </label>
          <select
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} {acc.account_type ? `(${acc.account_type})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Reference Number (Optional)
          </label>
          <input
            type="text"
            name="reference_number"
            placeholder="Enter reference number"
            value={formData.reference_number}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            placeholder="Enter additional notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
