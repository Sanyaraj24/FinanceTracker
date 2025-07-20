"use client";

import { FiCreditCard } from "react-icons/fi";
import { FaTrash, FaChartBar, FaRupeeSign } from "react-icons/fa";
import Link from "next/link";
import useAuth from "@/app/hook/useAuth";
import toast from "react-hot-toast";

export const AccountCard = ({ account, onDelete }) => {
  const { user } = useAuth();

  const getAccountTypeStyles = (type) => {
    switch (type) {
      case "savings":
        return {
          bg: "bg-[#6f6dc6]/10",
          icon: "text-[#6f6dc6]",
          badge: "bg-[#6f6dc6]/20 text-[#6f6dc6]",
        };
      case "credit":
        return {
          bg: "bg-[#9c7aff]/10",
          icon: "text-[#9c7aff]",
          badge: "bg-[#9c7aff]/20 text-[#9c7aff]",
        };
      default:
        return {
          bg: "bg-[#4caf50]/10",
          icon: "text-[#4caf50]",
          badge: "bg-[#4caf50]/20 text-[#4caf50]",
        };
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    try {
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete account:", err);
      toast.error(err.message);
    }
  };

  const styles = getAccountTypeStyles(account.account_type);

  return (
    <Link href={`/transactions`} passHref>
      <div
        className="group relative p-5 bg-[#181a24] rounded-xl border-4 border-[#2d2f3a] shadow-xs hover:shadow-md hover:shadow-[#6f6dc6]/10 transition-all duration-200 cursor-pointer"
        onClick={(e) => {
          if (e.target.closest(".no-nav")) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-3 rounded-xl ${styles.bg}`}>
                <FiCreditCard className={`text-lg ${styles.icon}`} />
              </div>
              <div className="truncate">
                <h3 className="font-semibold text-white truncate">
                  {account.name}
                </h3>
                <p className="text-[#b8b8b8] text-sm mt-1">
                  {account.account_number
                    ? `•••• ${account.account_number.slice(-4)}`
                    : "No account number"}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right pl-4">
            <div className="flex items-center justify-end">
              <FaRupeeSign className="text-[#6f6dc6] mr-1" />
              <p className="text-xl font-bold text-white">
                {new Intl.NumberFormat("en-IN").format(account.balance)}
              </p>
            </div>
            <span
              className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${styles.badge}`}
            >
              {account.account_type?.toUpperCase() || "ACCOUNT"}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-5 pt-4 border-t border-[#2d2f3a]">
          <button
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-[#b8b8b8] hover:text-[#6f6dc6] hover:bg-[#6f6dc6]/10 px-3 py-2 rounded-lg transition-colors"
            aria-label={`View transactions for ${account.name}`}
          >
            <FaChartBar className="text-[#6f6dc6]" />
            <span>Transactions</span>
          </button>
          {console.log("This is account", account)}
          <button
            className="no-nav flex-1 flex items-center justify-center gap-2 text-sm font-medium text-[#b8b8b8] hover:text-[#ff5252] hover:bg-[#ff5252]/10 px-3 py-2 rounded-lg transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(account?.id);
            }}
            aria-label={`Remove account ${account.name}`}
          >
            <FaTrash className="text-[#ff5252]" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
