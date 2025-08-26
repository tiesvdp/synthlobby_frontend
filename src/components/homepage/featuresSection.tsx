import { title } from "@/components/primitives";
import { Card } from "@heroui/card";
import { motion } from "framer-motion";
import { GoGitCompare } from "react-icons/go";
import { FiTrendingUp, FiArchive, FiGift } from "react-icons/fi";

const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, amount: 0.5 }}
    className="h-full"
  >
    <Card className="p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
      <div className="rounded-full bg-purple-100 text-purple-700 p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-default-600">{description}</p>
    </Card>
  </motion.div>
);

export function FeaturesSection() {
  return (
    <section className="w-full py-6 md:py-12 relative bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjMDI2ZDMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-12 text-center"
        >
          <h2 className={`${title({ size: "sm" })}`}>
            See Through the{" "}
            <span className="text-[#c026d3]">Marketing Hype</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FiTrendingUp className="w-8 h-8" />}
            title="True Price History"
            description="We track the actual price of every synth, every day. See the real data, not just a retailer's temporary 'sale' price."
            delay={0.1}
          />
          <FeatureCard
            icon={<GoGitCompare className="w-8 h-8" />}
            title="Make Informed Decisions"
            description="Analyze price trends side-by-side. Our clear charts give you the knowledge to know exactly when to buy."
            delay={0.2}
          />
          <FeatureCard
            icon={<FiArchive className="w-8 h-8" />}
            title="Your Studio, Organized"
            description="Stop juggling bookmarks. Build your synth collection in one place and track everything at once."
            delay={0.3}
          />
          <FeatureCard
            icon={<FiGift className="w-8 h-8" />}
            title="Always Free"
            description="SynthLobby is a passion project. All features are, and will always be, completely free for everyone to use."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
