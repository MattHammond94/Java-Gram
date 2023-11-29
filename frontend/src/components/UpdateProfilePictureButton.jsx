import OpenModalButton from "./OpenModalButton";
import UpdateProfilePictureForm from "./UpdateProfilePictureForm";
import { useState } from "react";
import Modal from "./Modal";

const UpdateProfilePictureButton = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      <OpenModalButton 
        buttonContent={'Update'} 
        modalContent={ <UpdateProfilePictureForm setModalOpenStatus={ setModalOpenStatus } /> }
        setModalContent={ setModalContent }
        setModalOpenStatus={ setModalOpenStatus }
      />
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} >
        { modalContent }
      </Modal>
    </>
  )
}

export default UpdateProfilePictureButton