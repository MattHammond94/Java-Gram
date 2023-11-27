import { useState } from "react";
import { GiLockedFortress } from "react-icons/gi";
import OpenModalButton from "../components/OpenModalButton";
import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";
import Modal from "../components/Modal";

const PrivatePage = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      <div className="privatePageContainer">
        <div className="privateIconContainer">
          <GiLockedFortress className="lockedIcon"/>
        </div>
        <div className="privateContentContainer">
          <h1>This is a private page.</h1>
          <p>You must be logged in to access this content.</p>
          <OpenModalButton 
            buttonContent={ "Log In" }
            modalContent={ <LogInForm /> }
            setModalContent={ setModalContent }
            setModalOpenStatus={ setModalOpenStatus }
          />
          <OpenModalButton
            buttonContent={ "Sign Up" }
            modalContent={ <SignUpForm /> }
            setModalContent={ setModalContent }
            setModalOpenStatus={ setModalOpenStatus }
          />
        </div>
      </div>
      <div className="waves layer1"></div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} >
        { modalContent }
      </Modal>
    </>
  )
}

export default PrivatePage