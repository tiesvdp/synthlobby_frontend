import { FunctionComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

import { useGetBrands } from "@/api/synths.ts";

const BrandList: FunctionComponent = () => {
  const { data } = useGetBrands("");
  const brands = data || [];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr my-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {brands.map((brand) => (
        <div key={uuidv4()}>{brand}</div>
      ))}
    </motion.div>
  );
};

export default BrandList;