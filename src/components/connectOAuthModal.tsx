import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FC } from "react";
import { signIn } from "next-auth/react";
import Icon from "./icon";

interface ConnectOAuthModalProps {
  providerId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ConnectOAuthModal: FC<ConnectOAuthModalProps> = ({
  providerId,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <ModalHeader
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Icon name={`bxl-${providerId}`} color="blue.600" size="32px" />
          Connect your account
        </ModalHeader>
        <ModalBody>
          To access your {providerId} through onebox, please link your{" "}
          {providerId} account.
        </ModalBody>
        <Flex direction="row" gap="4" paddingX="6" paddingY="4">
          <Button
            variant="outline"
            colorScheme="gray"
            border="2px"
            onClick={onClose}
            size="sm"
            paddingX="6"
          >
            Cancel
          </Button>
          <Button
            onClick={() => signIn(providerId)}
            colorScheme="blue"
            paddingX="6"
            size="sm"
          >
            Connect
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ConnectOAuthModal;
