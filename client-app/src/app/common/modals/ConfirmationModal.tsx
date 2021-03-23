import React, { useContext } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";

interface IProps {
  header: string;
  message: string;
  callback: () => void;
}
const ConfirmationModal: React.FC<IProps> = ({ header, message, callback }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  return (
    <>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{message}</Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={callback}>
          <Icon name='remove' /> Yes
        </Button>
        <Button color='red' onClick={closeModal}>
          <Icon name='checkmark' /> No
        </Button>
      </Modal.Actions>
    </>
  );
};

export default ConfirmationModal;
