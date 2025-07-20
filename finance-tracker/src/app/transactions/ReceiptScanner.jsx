"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { extractReceiptDetails } from "./geminiOCR";
import { addTransaction } from "../utils/addTransaction";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";

const allowedPaymentMethods = ["cash", "card", "bank_transfer", "check", "UPI"];

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
  transfer: ["Account Transfer", "Investment Transfer", "Other Transfer"],
};

const ReceiptScanner = ({ onScanComplete, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    transaction_date: "",
    description: "",
    user_id: user?.uid,
    category: "",
    account_id: "",
    amount: "",
    transaction_type: "expense",
    paymentMethod: "cash",
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user?.uid) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts?user_id=${user?.uid}`
        );
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data = await response.json();
        setAccounts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [user?.uid]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = await extractReceiptDetails(file);
      const parsedDate = new Date(data?.date);
      const isoDate = !isNaN(parsedDate)
        ? parsedDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      setFormData((prev) => ({
        ...prev,
        transaction_date: isoDate,
        description: data.description || "Scanned Receipt",
        amount: parseFloat(data.amount || 0),
        paymentMethod: allowedPaymentMethods.includes(data.paymentMethod)
          ? data.paymentMethod
          : "cash",
        // Optionally set category from receipt if detected
        category: data.category || "",
      }));
    } catch (err) {
      toast.error("Failed to extract receipt details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when transaction type changes
      ...(name === "transaction_type" && { category: "" }),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    const payload = {
      ...formData,
      user_id: user?.uid,
      account_id: Number(formData.account_id),
    };
    const data = await addTransaction(payload);

    if (data?.success) {
      const newTransaction = {
        ...formData,
        amount: parseFloat(formData.amount),
      };
      onScanComplete(newTransaction);
      onClose();
    } else {
      toast.error("Error while adding new transaction!");
    }
  };

  return (
    <div className="space-y-6 max-h-[90vh] overflow-y-auto p-4 bg-[#181a24] text-white">
      <h2 className="text-xl font-bold text-[#6f6dc6] mb-4">Scan Receipt</h2>

      <div className="border-2 border-dashed border-[#6f6dc6]/50 rounded-lg p-8 text-center bg-[#1f2232] hover:border-[#6f6dc6] transition-colors">
        <FiUpload className="mx-auto h-12 w-12 text-[#6f6dc6]" />
        <h3 className="mt-2 text-sm font-medium text-white">
          Upload receipt image
        </h3>
        <p className="mt-1 text-sm text-[#b8b8b8]">JPG, PNG accepted</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-4 hidden"
          id="receipt-upload"
        />
        <label
          htmlFor="receipt-upload"
          className="mt-4 inline-block px-4 py-2 bg-[#6f6dc6] text-white rounded-lg hover:bg-[#8b89d8] cursor-pointer transition-colors"
        >
          Choose File
        </label>
        {loading && <p className="text-[#6f6dc6] mt-2">Scanning receipt...</p>}
      </div>

      <div className="space-y-4">
        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleChange}
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
        />
        <select
          name="account_id"
          value={formData.account_id}
          onChange={handleChange}
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
          required
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} {acc.account_type ? `(${acc.account_type})` : ""}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
        />
        <select
          name="transaction_type"
          value={formData.transaction_type}
          onChange={handleChange}
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
          required
        >
          <option value="">Select a category</option>
          {categories[formData.transaction_type]?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full bg-[#1f2232] border border-[#2d2f3a] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#6f6dc6] focus:border-transparent"
        >
          {allowedPaymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
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
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#6f6dc6] text-white rounded-lg hover:bg-[#8b89d8] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReceiptScanner;
