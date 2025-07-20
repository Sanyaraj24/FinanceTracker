"use client";
import GoogleAuth from "./GoogleAuth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#181a24] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e2030] rounded-xl shadow-lg p-8 space-y-6 border border-[#2e3040]">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#6f6dc6]">BachatBuddy</h1>
          <p className="text-gray-300">Manage your finances in one place</p>
        </div>

        <GoogleAuth />

        <p className="text-xs text-gray-400 text-center pt-4 border-t border-[#2e3040]">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#6f6dc6] hover:underline">
            Terms
          </a>{" "}
          and
          <a href="#" className="text-[#6f6dc6] hover:underline">
            {" "}
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
