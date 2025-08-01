import { FunctionComponent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Link } from "@heroui/link";

import { Synth } from "@/models/synths.ts";

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  backdrop: "opaque" | "blur" | "transparent";
  synths: Synth[];
}

const ModalPopup: FunctionComponent<ModalPopupProps> = ({
  isOpen,
  onClose,
  backdrop,
  synths,
}) => {
  return (
    <Modal
      backdrop={backdrop}
      isOpen={isOpen}
      onClose={onClose}
      shouldBlockScroll={false}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1" />
          <ModalBody>
            {synths.map((synth: Synth) => (
              <Link
                key={synth.id}
                isBlock
                showAnchorIcon
                href={synth.href}
                target="blank"
              >
                {`${synth.name} - ${synth.availability}`}
              </Link>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ModalPopup;
