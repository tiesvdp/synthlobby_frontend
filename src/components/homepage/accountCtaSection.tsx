import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { FiHeart, FiBell } from "react-icons/fi";
import { GoGitCompare } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export function AccountCtaSection() {
  const navigate = useNavigate();
  return (
    <section className="w-full my-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7c1fa2]/90 to-[#2d064d]/90 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-3">
                Power Up Your Synth Search
              </h3>
              <p className="text-purple-200 mt-2 max-w-lg text-lg">
                Create a free account to access powerful, time-saving tools and
                build your dream studio for less.
              </p>
              <ul className="space-y-3 mt-6 text-purple-100">
                <li className="flex items-center gap-3">
                  <FiHeart className="text-pink-300 flex-shrink-0" />
                  <span>Build and manage your personal synth wishlist.</span>
                </li>
                <li className="flex items-center gap-3">
                  <GoGitCompare className="text-pink-300 flex-shrink-0" />
                  <span>Compare price histories across all retailers.</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiBell className="text-pink-300 flex-shrink-0" />
                  <span>Get daily email alerts on price drops.</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button
                size="lg"
                radius="full"
                className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-white font-bold shadow-lg scale-100 hover:scale-105 transition-transform px-8 py-6 text-base"
                onPress={() => navigate("/register")}
              >
                Create Your Free Account
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
