import { Link } from "@heroui/link";
import PageTransition from "@/motion/pageTransition.tsx";
import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen container mx-auto max-w-8xl">
      <Navbar />
      <main className="container mx-auto max-w-8xl px-6 flex-grow pt-8">
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
