import { useState } from "react";
import OpenModalButton from "./OpenModalButton";
import Modal from "./Modal";
import CreatePostForm from "./CreatePostForm";

const CreatePostButton = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  return (
    <>
      <div>
        <OpenModalButton 
          buttonContent={ <img className="createPostBtnImg" src="/CreatePostButton.png" alt="Graphic Icon of a Camera" /> }
          modalContent={ <CreatePostForm /> }
          setModalContent={ setModalContent }
          setModalOpenStatus={ setModalOpenStatus }
        />
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus}>
        { modalContent }
      </Modal>
    </>
  );
}

export default CreatePostButton;