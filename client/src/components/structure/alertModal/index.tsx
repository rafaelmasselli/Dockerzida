import Modal from "react-modal";

import "./styles.scss";

interface IModal {
  modalIsOpen: boolean;
  closeModal: () => void;
  titleModal: string;
  descriptionModal: any;
}

const customStyles = {
  content: {
    top: "40%",
    width: "350px",
    height: "200px",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function AlertModal({
  closeModal,
  descriptionModal,
  modalIsOpen,
  titleModal,
}: IModal) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="container__modal">
        <h2>{titleModal}</h2>
        <p>{descriptionModal}</p>
        <button onClick={closeModal}>Sair</button>
      </div>
    </Modal>
  );
}
