import { useState } from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import Modal from "../components/Modal";
import OpenModalButton from "../components/OpenModalButton";

const HomePage = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      <div className="homePage">
        <div className="homeContentContainer">
          <h1>Java-Gram</h1>
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
        <div className="waves layer1"></div>
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} >
        { modalContent }
      </Modal>
    </>
  )
}

export default HomePage;