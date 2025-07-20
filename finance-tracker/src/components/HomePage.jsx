import Footer from "./Footer";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#181a24]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Take Control of Your{" "}
            <span className="text-[#6f6dc6]">Finances</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Simple, powerful tools to track your spending, manage budgets, and
            achieve your financial goals.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-md text-base font-medium text-white bg-[#6f6dc6] hover:bg-[#7d7bd3] shadow-lg transition-all"
            >
              Get Started
            </Link>
            <Link
              href="/features"
              className="px-6 py-3 rounded-md text-base font-medium text-[#6f6dc6] bg-transparent hover:bg-[#232637] border-2 border-[#6f6dc6] transition-all"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Powerful Features
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Everything you need to manage your money effectively
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-[#1f2232] rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#6f6dc6]/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#6f6dc6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Income Tracking
              </h3>
              <p className="text-gray-400">
                Monitor all your income sources with detailed analytics and
                visual reports.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1f2232] rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#6f6dc6]/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#6f6dc6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Expense Management
              </h3>
              <p className="text-gray-400">
                Categorize and analyze your spending patterns with smart
                categorization.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1f2232] rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#6f6dc6]/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#6f6dc6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Smart Budgeting
              </h3>
              <p className="text-gray-400">
                Create personalized budgets that adapt to your spending habits
                automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gradient-to-r from-[#6f6dc6]/10 to-[#6f6dc6]/5 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6f6dc6] mb-2">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6f6dc6] mb-2">
                $50M+
              </div>
              <div className="text-gray-300">Tracked Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6f6dc6] mb-2">4.9★</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1f2232] rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6f6dc6] flex items-center justify-center text-white font-bold mr-3">
                  JD
                </div>
                <div>
                  <h4 className="text-white font-medium">John D.</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-400 italic">
                "This app completely transformed how I manage my finances. The
                budgeting tools are incredible!"
              </p>
            </div>
            <div className="bg-[#1f2232] rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6f6dc6] flex items-center justify-center text-white font-bold mr-3">
                  SM
                </div>
                <div>
                  <h4 className="text-white font-medium">Sarah M.</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-400 italic">
                "Finally a finance app that's both powerful and easy to use. The
                reports are so insightful."
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-br from-[#6f6dc6] to-[#8a88d3] rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their financial
            future.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 rounded-lg text-[#6f6dc6] bg-white hover:bg-gray-100 font-medium shadow-lg transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
