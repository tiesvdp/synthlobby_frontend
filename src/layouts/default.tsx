import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";
import PageTransition from "@/motion/pageTransition.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-10">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://tiesvdp.be"
          title="tiesvdp portfolio"
        >
          <span className="text-default-600">Developed with love by</span>
          <p className="text-primary">Tiesvdp</p>
        </Link>
      </footer>
    </div>
  );
}
