import { motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      animate="animate"
      exit="exit"
      initial="initial"
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
