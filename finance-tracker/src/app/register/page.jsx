'use client';
import GoogleAuth from "./GoogleAuth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">FinanceTracker</h1>
          <p className="text-gray-600">Manage your finances in one place</p>
        </div>
        
        <GoogleAuth />
        
        <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-100">
          By continuing, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms</a> and 
          <a href="#" className="text-indigo-600 hover:underline"> Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}