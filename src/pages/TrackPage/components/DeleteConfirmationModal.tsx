import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface DeleteConfirmationModalProps {
  title: React.ReactNode;
  message?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      size="xs"
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {message ? <ModalBody>{message}</ModalBody> : null}
        <ModalFooter>
          <Button
            size="sm"
            mr={3}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            bg="red.500"
            _hover={{ bg: "red.400" }}
            _active={{ bg: "red.600" }}
          >
            Delete
          </Button>
          <Button size="sm" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
