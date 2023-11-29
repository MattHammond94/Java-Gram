import { useState } from "react";
import OpenModalButton from "./OpenModalButton";
import Modal from "./Modal";
import CreatePostForm from "./CreatePostForm";
import { FaCameraRetro } from "react-icons/fa";
import { IoCameraSharp } from "react-icons/io5";

const CreatePostButton = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // <FaCameraRetro className="createPostBtnImg"/> 
  // <IoCameraSharp className="createPostBtnImg" />
  // <img src="CreatePostButton.png" className="createPostBtnImg" />

  return (
    <>
      <div>
        <OpenModalButton 
          buttonContent={ <img src="/CreatePostButton.png" className="createPostBtnImg" /> }
          modalContent={ <CreatePostForm setModalOpenStatus={ setModalOpenStatus } /> }
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