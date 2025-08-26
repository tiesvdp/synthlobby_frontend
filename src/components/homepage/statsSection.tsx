import { motion } from "framer-motion";
import { useGetSynths } from "@/api/synths";
import { Card } from "@heroui/card";
import { FiTag, FiActivity } from "react-icons/fi";
import { CgPiano } from "react-icons/cg";
import { isToday } from "date-fns";

const StatItem = ({
  icon,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
      {icon}
      <span className="text-4xl font-bold text-[#c026d3] mt-2">{value}</span>
      <span className="text-default-500 text-sm mt-1">{label}</span>
    </Card>
  </motion.div>
);

export function StatsSection() {
  const { data: synths } = useGetSynths();

  const totalSynths = synths?.length || 0;
  const totalBrands = synths ? new Set(synths.map((s) => s.brand)).size : 0;

  const priceUpdatesToday = synths
    ? synths.filter((s) => {
        if (!s.prices || s.prices.length === 0) return false;
        const lastPriceDate = new Date(s.prices[s.prices.length - 1].date);
        return isToday(lastPriceDate);
      }).length
    : 0;

  return (
    <section className="w-full py-16 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjMDI2ZDMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatItem
            icon={<CgPiano className="w-10 h-10 text-[#c026d3]" />}
            value={totalSynths.toLocaleString()}
            label="Synths Tracked"
            delay={0.1}
          />
          <StatItem
            icon={<FiActivity className="w-10 h-10 text-[#c026d3]" />}
            value={priceUpdatesToday.toLocaleString()}
            label="Price Updates Today"
            delay={0.2}
          />
          <StatItem
            icon={<FiTag className="w-10 h-10 text-[#c026d3]" />}
            value={totalBrands.toString()}
            label="Unique Brands"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
