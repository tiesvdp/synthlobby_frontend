import { useGetLastScrape } from "@/api/synths";

function formatDate(isoString: string) {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/Brussels",
  };
  const formatted = date.toLocaleString("en-GB", options).replace(",", "");
  const tz =
    Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Brussels",
      timeZoneName: "short",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "CET";
  return `${formatted} (${tz})`;
}

export default function LastRefreshed() {
  const { data, error } = useGetLastScrape();

  if (error)
    return (
      <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-none bg-gradient-to-r from-[#7c1fa2]/90 to-[#2d064d]/90 text-red-100 shadow border border-red-300 animate-pulse">
        Could not fetch refresh time
      </span>
    );

  return (
    <span className="inline-block text-xs md:text-sm px-3 py-1 rounded-none bg-gradient-to-r from-[#7c1fa2]/90 to-[#2d064d]/90 text-gray-100 shadow border border-violet-700/40 backdrop-blur-sm">
      Last refreshed at{" "}
      <span className="font-semibold">{formatDate(data)}</span>
    </span>
  );
}
