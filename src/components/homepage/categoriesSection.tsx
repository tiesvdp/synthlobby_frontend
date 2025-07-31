import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CategoriesSection() {
  const navigate = useNavigate();

  const categories = [
    "Analog Synths",
    "Digital Keyboards",
    "MIDI Controllers",
    "Modular Systems",
    "Drum Machines",
    "Grooveboxes",
    "Workstations",
    "Samplers",
    "Eurorack",
    "Vintage",
  ];

  return (
    <section className="w-full lg:my-16 my-8 relative ">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjMDI2ZDMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTQwIDQwVjBoNDB2NDBINDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 z-0"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10"
        >
          Popular <span className="text-[#c026d3]">Categories</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2 rounded-full bg-[#f3e8ff] text-[#9333ea] font-medium hover:bg-[#e9d5ff] transition-colors shadow-sm"
              onClick={() => navigate("/synths")}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
