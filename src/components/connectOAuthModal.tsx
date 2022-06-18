import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { FC } from "react";
import { signIn } from "next-auth/react";

interface ConnectOAuthModalProps {
  providerId: "twitter" | "facebook" | "google";
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ConnectOAuthModal: FC<ConnectOAuthModalProps> = ({ providerId, isOpen, onClose }) => { 
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect your account</ModalHeader>
        <ModalBody>To access your {providerId} through onebox, please link your {providerId} account.</ModalBody>
      </ModalContent>
      <ModalFooter>
        <ModalCloseButton>Cancel</ModalCloseButton>         
      </ModalFooter>  
    </Modal>
      
  )
}

export default ConnectOAuthModal;