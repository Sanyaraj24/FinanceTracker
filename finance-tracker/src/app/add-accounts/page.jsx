"use client";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddAccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    account_type: "",
    balance: "",
    currency: "",
    bank_name: "",
    account_number: "",
    notes: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    const payload = {
      user_id: userId,
      name: formData.name.trim(),
      account_type: formData.account_type.trim().toLowerCase(),
      balance: parseFloat(formData.balance || 0),
      currency: formData.currency.trim() || "INR",
      bank_name: formData.bank_name.trim(),
      account_number: formData.account_number.trim(),
      notes: formData.notes.trim(),
      is_active: true,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-accounts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Account added successfully.");
        router.push("/dashboard");
        setFormData({
          name: "",
          account_type: "",
          balance: "",
          currency: "",
          bank_name: "",
          account_number: "",
          notes: "",
        });
        setAccounts((prev) => [...prev, data.account]);
      } else {
        toast.error(data.error || data.message || "Failed to add account.");
      }
    } catch (err) {
      toast.error("An error occurred while adding the account.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#181a24] rounded-lg border border-[#2e3040]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#6f6dc6] mb-1">
          Your Accounts
        </h2>
        <p className="text-gray-300">
          Manage all your financial accounts in one place
        </p>
      </div>

      <div className="mb-8 p-6 bg-[#1e2030] rounded-lg border border-[#2e3040]">
        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
          <FaPlus className="text-[#6f6dc6]" />
          Add New Account
        </h3>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Account Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="e.g. Main Savings"
              className="w-full px-3 py-2 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Account Type
            </label>
            <select
              name="account_type"
              required
              value={formData.account_type}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full px-3 py-2 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
            >
              <option value="" disabled className="bg-[#1e2030]">
                Select type
              </option>
              <option value="checking" className="bg-[#1e2030]">
                Checking
              </option>
              <option value="savings" className="bg-[#1e2030]">
                Savings
              </option>
              <option value="credit_card" className="bg-[#1e2030]">
                Credit Card
              </option>
              <option value="cash" className="bg-[#1e2030]">
                Cash
              </option>
              <option value="investment" className="bg-[#1e2030]">
                Investment
              </option>
              <option value="loan" className="bg-[#1e2030]">
                Loan
              </option>
              <option value="wallet" className="bg-[#1e2030]">
                Wallet
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ₹
              </span>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="0.00"
                className="w-full px-3 py-2 pl-8 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Bank name"
              className="w-full px-3 py-2 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Account number"
              className="w-full px-3 py-2 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Currency
            </label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="INR, USD, etc."
              className="w-full px-3 py-2 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Notes
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Optional notes"
              className="w-full px-3 py-2 border border-[#2e3040] rounded-md bg-[#181a24] text-gray-200 focus:ring-1 focus:ring-[#6f6dc6] focus:border-[#6f6dc6]"
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#6f6dc6] hover:bg-[#5e5cb3] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors w-full md:w-auto"
            >
              <FaPlus size={14} /> Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountPage;
