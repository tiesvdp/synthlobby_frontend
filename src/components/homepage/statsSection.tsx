import { motion } from "framer-motion";

export function StatsSection() {
  return (
    <section className="w-full py-6 my-12 relative bg-gradient-to-r from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#c026d3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <span className="text-3xl font-bold text-[#c026d3]">1000+</span>
            <span className="text-default-500 text-sm">Synths Tracked</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#c026d3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <span className="text-3xl font-bold text-[#c026d3]">3+</span>
            <span className="text-default-500 text-sm">Retailers</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#c026d3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <span className="text-3xl font-bold text-[#c026d3]">€10K+</span>
            <span className="text-default-500 text-sm">Saved by Users</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#c026d3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span className="text-3xl font-bold text-[#c026d3]">5K+</span>
            <span className="text-default-500 text-sm">Happy Musicians</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
