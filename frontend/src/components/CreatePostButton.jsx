import { useState } from "react";
import OpenModalButton from "./OpenModalButton";
import Modal from "./Modal";
import CreatePostForm from "./CreatePostForm";

const CreatePostButton = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);

  return (
    <>
      <div>
        <OpenModalButton 
          buttonContent={ <img src="/CreatePostButton.png" className="createPostBtnImg" /> }
          modalContent={ <CreatePostForm setModalOpenStatus={ setModalOpenStatus } setContentLoadingStatus={ setContentLoading } /> }
          setModalContent={ setModalContent }
          setModalOpenStatus={ setModalOpenStatus }
        />
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} contentLoading={contentLoading}>
        { modalContent }
      </Modal>
    </>
  );
}

export default CreatePostButton;