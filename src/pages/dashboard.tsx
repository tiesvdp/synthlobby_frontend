import DefaultLayout from "@/layouts/default";
import { FunctionComponent, useMemo } from "react";
import { useAuth } from "@/context/authContext";
import { useGetSynths } from "@/api/synths";
import { useUserPreferences } from "@/context/userPreferencesContext";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Synth } from "@/models/synths";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrendingDown,
  FiTrendingUp,
  FiInfo,
  FiArrowUpCircle,
  FiArrowDownCircle,
} from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { HeartIcon } from "@/components/heartIcon";
import { title, subtitle } from "@/components/primitives";
import MoverItem from "@/components/dashboard/moverItem";
import { calculateRecentPriceChange, formatPrice } from "@/utils/priceUtils";
import WishlistItemCard from "@/components/dashboard/wishlistItemCard";
import StatCard from "@/components/dashboard/statCard";
import { formatSynthName } from "@/utils/nameUtils";

const Dashboard: FunctionComponent = () => {
  const { currentUser } = useAuth();
  const { data: allSynths, isLoading: isLoadingSynths } = useGetSynths();
  const {
    likedSynths: likedSynthPrefs,
    compareSynthIds,
    toggleLike,
    toggleCompare,
    toggleNotification,
    isLoading: isLoadingPrefs,
  } = useUserPreferences();

  const {
    fullLikedSynths,
    wishlistStats,
    marketMovers,
    mostExpensiveSynth,
    cheapestSynth,
  } = useMemo(() => {
    if (!allSynths)
      return {
        fullLikedSynths: [],
        wishlistStats: { totalValue: 0, count: 0 },
        marketMovers: { topDrops: [], topIncreases: [] },
        mostExpensiveSynth: null,
        cheapestSynth: null,
      };

    const likedSynthIds = new Set(likedSynthPrefs.map((s) => s.synthId));
    const fullLikedSynths = allSynths
      .filter((synth) => likedSynthIds.has(synth.id))
      .map((synth) => {
        const pref = likedSynthPrefs.find((p) => p.synthId === synth.id);
        return {
          ...synth,
          notificationsEnabled: pref?.notificationsEnabled ?? false,
        };
      });

    const totalValue = fullLikedSynths.reduce(
      (acc, s) => acc + (s.price || 0),
      0
    );

    let mostExpensiveSynth: Synth | null = null;
    let cheapestSynth: Synth | null = null;

    if (fullLikedSynths.length > 0) {
      mostExpensiveSynth = fullLikedSynths.reduce((max, synth) =>
        (synth.price || 0) > (max.price || 0) ? synth : max
      );
      cheapestSynth = fullLikedSynths.reduce((min, synth) =>
        (synth.price || 0) < (min.price || 0) ? synth : min
      );
    }

    const synthsWithChange = allSynths
      .map((synth) => {
        const { percentChange } = calculateRecentPriceChange(synth.prices);
        return { ...synth, percentChange };
      })
      .filter((s) => s.percentChange !== null || s.percentChange !== 0);

    synthsWithChange.sort(
      (a, b) => (a.percentChange ?? 0) - (b.percentChange ?? 0)
    );
    const topDrops = synthsWithChange.slice(0, 3);
    const topIncreases = synthsWithChange.slice(-3).reverse();

    return {
      fullLikedSynths,
      wishlistStats: {
        totalValue,
        count: fullLikedSynths.length,
      },
      marketMovers: { topDrops, topIncreases },
      mostExpensiveSynth,
      cheapestSynth,
    };
  }, [allSynths, likedSynthPrefs]);

  if (isLoadingSynths || isLoadingPrefs) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner label="Loading Dashboard..." color="secondary" size="lg" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="mt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={title()}>
            Welcome back,{" "}
            <span className={title({ color: "violet" })}>
              {currentUser?.displayName || "Synth Enthusiast"}!
            </span>
          </h1>
          <p className={subtitle({ class: "mt-2" })}>
            Here's your personal dashboard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          <main className="lg:col-span-2">
            <div className="bg-purple-50 border border-purple-200 text-purple-800 p-4 rounded-lg flex gap-4 items-center mb-6">
              <FiInfo size={24} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold">Price Drop Notifications</h3>
                <p className="text-sm">
                  Enable email alerts for significant price drops on any synth
                  in your wishlist. Just use the toggle on each item below.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Wishlist
            </h2>

            {fullLikedSynths.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fullLikedSynths.map((synth) => (
                    <WishlistItemCard
                      key={synth.id}
                      synth={synth}
                      isCompared={compareSynthIds.has(synth.id)}
                      onToggleLike={toggleLike}
                      onToggleCompare={toggleCompare}
                      onToggleNotification={toggleNotification}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700">
                  Your wishlist is empty
                </h3>
                <p className="mt-2 text-gray-500">
                  Click the heart icon on any synth to add it to your dashboard.
                </p>
              </div>
            )}
          </main>

          <aside className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                At a Glance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <StatCard
                  icon={<HeartIcon filled={true} />}
                  title="Items in Wishlist"
                >
                  <p className="font-bold text-xl text-gray-800">
                    {wishlistStats.count.toString()}
                  </p>
                </StatCard>
                <StatCard
                  icon={<FaEuroSign size={24} />}
                  title="Total Wishlist Value"
                >
                  <p className="font-bold text-xl text-gray-800">
                    {formatPrice(wishlistStats.totalValue)}
                  </p>
                </StatCard>
                {mostExpensiveSynth && (
                  <StatCard
                    icon={<FiArrowUpCircle size={24} />}
                    title="Most Expensive"
                  >
                    <p className="font-bold text-xl text-gray-800">
                      {formatPrice(mostExpensiveSynth.price || 0)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatSynthName(mostExpensiveSynth)}
                    </p>
                  </StatCard>
                )}
                {cheapestSynth && (
                  <StatCard
                    icon={<FiArrowDownCircle size={24} />}
                    title="Cheapest"
                  >
                    <p className="font-bold text-xl text-gray-800">
                      {formatPrice(cheapestSynth.price || 0)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatSynthName(cheapestSynth)}
                    </p>
                  </StatCard>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Market Movers
              </h2>
              <Card>
                <CardBody className="p-4 space-y-2">
                  <h3 className="font-semibold text-green-600 flex items-center gap-2">
                    <FiTrendingDown />
                    Biggest Drops
                  </h3>
                  {marketMovers.topDrops.length > 0 ? (
                    marketMovers.topDrops.map((s) => (
                      <MoverItem
                        key={s.id + "drop"}
                        synth={s}
                        change={s.percentChange!}
                      />
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 p-2">
                      No significant drops recently.
                    </p>
                  )}
                  <hr className="my-2" />
                  <h3 className="font-semibold text-red-500 flex items-center gap-2">
                    <FiTrendingUp />
                    Biggest Increases
                  </h3>
                  {marketMovers.topIncreases.length > 0 ? (
                    marketMovers.topIncreases.map((s) => (
                      <MoverItem
                        key={s.id + "increase"}
                        synth={s}
                        change={s.percentChange!}
                      />
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 p-2">
                      No significant increases recently.
                    </p>
                  )}
                </CardBody>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
