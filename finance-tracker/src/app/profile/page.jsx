"use client";

import { useState, useEffect } from "react";
import { FiUser, FiMail, FiCalendar } from "react-icons/fi";
import useAuth from "../hook/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    joinDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName || " ",
        email: user.email || " ",
        joinDate:
          new Date(user.metadata.creationTime).toLocaleDateString() ||
          "January 1, 2023",
      });
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#181a24]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f6dc6]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181a24] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6f6dc6] mb-8">
          Profile Information
        </h1>

        {/* Profile Card */}
        <div className="bg-[#1f2232] rounded-xl border border-[#6f6dc6]/20 overflow-hidden mb-8">
          <div className="p-6 border-b border-[#6f6dc6]/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#6f6dc6]/20 flex items-center justify-center">
                  <FiUser className="text-[#6f6dc6] text-3xl" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {profileData.name}
                </h2>
                <p className="text-[#6f6dc6]/80 flex items-center gap-2 mt-1 text-sm sm:text-base">
                  <FiMail className="text-[#6f6dc6]/60" />
                  {profileData.email}
                </p>
                <p className="text-[#6f6dc6]/80 flex items-center gap-2 mt-1 text-sm sm:text-base">
                  <FiCalendar className="text-[#6f6dc6]/60" />
                  Member since {profileData.joinDate}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-[#6f6dc6] mb-6">
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#6f6dc6] mb-1">
                    User ID
                  </label>
                  <p className="text-sm text-[#6f6dc6]/70">
                    {user?.uid || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
