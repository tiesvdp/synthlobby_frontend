import { title } from "@/components/primitives";
import { Card } from "@heroui/card";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedSearchBar = ({ controls }: { controls: any }) => {
  const text = "Moog Matriarch";
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
  };

  const cursorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-52 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center px-3 overflow-hidden">
      <svg
        className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <motion.div
        className="flex"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            className="text-gray-700"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="w-0.5 h-5 bg-purple-600"
        variants={cursorVariants}
        initial="hidden"
        animate={controls}
      />
    </div>
  );
};

const AnimatedHeartIcon = ({ controls }: { controls: any }) => {
  const variants = {
    hidden: {
      fill: "rgba(192, 38, 211, 0)",
      pathLength: 0,
    },
    visible: {
      fill: "rgba(192, 38, 211, 1)",
      pathLength: 1,
      transition: {
        fill: { duration: 0.3, ease: "easeIn", delay: 0.7 },
        pathLength: { duration: 0.4, ease: "easeInOut" },
      },
    },
  };

  return (
    <motion.svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="#c026d3"
        fill="none"
      />
      <motion.path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="#c026d3"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={variants}
        initial="hidden"
        animate={controls}
      />
    </motion.svg>
  );
};

const AnimatedBellIcon = ({ controls }: { controls: any }) => {
  const variants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [0, -20, 20, -15, 15, -10, 10, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c026d3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        variants={variants}
        initial="hidden"
        animate={controls}
      />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </motion.svg>
  );
};

const StepCard = ({
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
    <Card className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow bg-white h-full flex flex-col items-center">
      <div className="h-16 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-default-600">{description}</p>
    </Card>
  </motion.div>
);

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  const searchControls = useAnimation();
  const heartControls = useAnimation();
  const bellControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      searchControls.start("visible");

      await new Promise((resolve) => setTimeout(resolve, 1500));
      await heartControls.start("visible");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await bellControls.start("visible");

      await new Promise((resolve) => setTimeout(resolve, 2500));

      const hideAll = [
        searchControls.start("hidden"),
        heartControls.start("hidden"),
        bellControls.start("hidden"),
      ];
      await Promise.all(hideAll);
    };

    let intervalId: NodeJS.Timeout | null = null;

    if (isInView) {
      sequence();
      intervalId = setInterval(sequence, 7000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isInView, searchControls, heartControls, bellControls]);

  return (
    <section className="w-full py-6 md:py-12 relative bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjMDI2ZDMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 z-0"></div>
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-6 md:mb-12 text-center"
        >
          <h2 className={title({ size: "sm" })}>
            Powerful tools, <span className="text-[#c026d3]">Zero cost</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={<AnimatedSearchBar controls={searchControls} />}
            title="1. Discover & Compare"
            description="Explore thousands of synthesizers from all major online retailers in one place."
            delay={0.1}
          />
          <StepCard
            icon={<AnimatedHeartIcon controls={heartControls} />}
            title="2. Build Your Wishlist"
            description="Save your favorite synths to your personal dashboard to track their prices over time."
            delay={0.2}
          />
          <StepCard
            icon={<AnimatedBellIcon controls={bellControls} />}
            title="3. Get Price Alerts"
            description="Enable email notifications and never miss a deal when the price drops on your dream gear."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
