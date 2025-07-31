import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CtaSection() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/synths");
  }

  return (
    <section className="w-full lg:my-16 my-12 text-center relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Ready to find your{" "}
          <span className="text-[#c026d3]">perfect synth?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-default-500 mb-8 max-w-2xl mx-auto"
        >
          Join thousands of musicians who've already found their dream gear at
          the best prices.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] shadow-lg text-white"
            radius="full"
            size="lg"
            onClick={handleClick}
          >
            <span className="font-medium text-white text-lg">
              Start browsing now
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
