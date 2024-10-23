import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/synths");
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={`${title()}`}>Ditch the hunt!&nbsp;</span>{" "}
          <span className={title({ color: "violet" })}>
            the cheapest keyboards,&nbsp;
          </span>
          <br />
          <span className={title()}>curated for you.</span>
          <div className={subtitle({ class: "mt-4" })}>
            SynthLobby scans the web for the best deals.
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="font-display text-2xl bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] shadow-lg"
            radius="full"
            size="lg"
            variant="shadow"
            onClick={handleClick}
          >
            Bring me there!
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}