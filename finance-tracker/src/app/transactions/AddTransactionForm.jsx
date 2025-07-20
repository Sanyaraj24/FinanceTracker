"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiCamera } from "react-icons/fi";

const AddTransactionForm = ({ userId, onTransactionAdded, onClose }) => {
  const [formData, setFormData] = useState({
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

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Define categories based on transaction type
  const categories = {
    expense: [
      "Food & Dining",
      "Shopping",
      "Housing",
      "Transportation",
      "Utilities",
      "Healthcare",
      "Entertainment",
      "Education",
      "Personal Care",
      "Gifts & Donations",
      "Travel",
      "Other Expenses",
    ],
    income: [
      "Salary",
      "Bonus",
      "Investment Income",
      "Rental Income",
      "Business Income",
      "Freelance Income",
      "Gifts Received",
      "Other Income",
    ],
  };

  useEffect(() => {
    if (!userId) return;

    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts?user_id=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch accounts");
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when transaction type changes
      ...(name === "transaction_type" && { category: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessage("Transaction added successfully!");
        const newTransaction = {
          id: Date.now(),
          date: formData.transaction_date,
          description: formData.description,
          category: formData.category,
          amount: parseFloat(formData.amount),
          type: formData.transaction_type,
          paymentMethod: formData.payment_method,
        };
        onTransactionAdded(newTransaction);
        setFormData((prev) => ({
          ...prev,
          amount: "",
          description: "",
          category: "",
          notes: "",
          reference_number: "",
        }));
        setTimeout(() => {
          onClose();
          setMessage("");
        }, 2000);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error adding transaction");
    }
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto px-4 sm:px-6 py-4 bg-[#181a24] rounded-xl w-full border border-[#2d2f3a]">
      <h2 className="text-xl font-bold text-[#6f6dc6] mb-4 border-b border-[#2d2f3a] pb-2">
        Add New Transaction
      </h2>

      {message && (
        <p
          className={`mb-4 p-3 text-sm rounded-md ${
            message.includes("success")
              ? "text-[#4caf50] bg-[#4caf50]/10"
              : "text-[#6f6dc6] bg-[#6f6dc6]/10"
          }`}
        >
          {message}
        </p>
      )}

      {loading && <p className="text-[#b8b8b8] mb-4">Loading accounts...</p>}
      {error && <p className="text-[#f44336] mb-4">Error: {error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#e2e2e2]">
            Account
          </label>
          <select
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id} className="bg-[#1f2232]">
                {acc.name} {acc.account_type ? `(${acc.account_type})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#e2e2e2]">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-[#6f6dc6]">₹</span>
              </div>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="pl-8 w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#e2e2e2]">
              Type
            </label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#e2e2e2]">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#e2e2e2]">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories[formData.transaction_type]?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#e2e2e2]">
              Payment Method
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#e2e2e2]">
              Date
            </label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#e2e2e2]">
            Reference Number (Optional)
          </label>
          <input
            type="text"
            name="reference_number"
            placeholder="Enter reference number"
            value={formData.reference_number}
            onChange={handleChange}
            className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#e2e2e2]">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            placeholder="Enter additional notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 bg-[#1f2232] border border-[#2d2f3a] rounded-lg text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#6f6dc6] rounded-lg text-[#6f6dc6] hover:bg-[#6f6dc6]/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#6f6dc6] rounded-lg text-white hover:bg-[#8b89d8] transition-colors"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
