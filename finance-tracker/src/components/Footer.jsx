export default function Footer() {
  return (
    <footer className="bg-[#181a24] border-t border-[#6f6dc6]/20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Copyright */}
          <div className="flex items-center">
            <span className="text-[#6f6dc6] font-semibold text-lg">FinanceTracker</span>
            <span className="ml-4 text-[#6f6dc6]/70 text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6">
              <a href="#" className="text-[#6f6dc6]/70 hover:text-[#6f6dc6] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#6f6dc6]/70 hover:text-[#6f6dc6] text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-[#6f6dc6]/70 hover:text-[#6f6dc6] text-sm transition-colors">
                Contact
              </a>
              <a href="#" className="text-[#6f6dc6]/70 hover:text-[#6f6dc6] text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 text-center text-[#6f6dc6]/50 text-xs">
          Made with <span className="text-[#6f6dc6]">❤️</span> for better financial management
        </div>
      </div>
    </footer>
  );
}