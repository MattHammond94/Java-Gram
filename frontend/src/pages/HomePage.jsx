import { useState } from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import Modal from "../components/Modal";

const HomePage = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const logInButton = () => {
    setModalContent(<LogInForm />);
    setModalOpenStatus(true);
  }

  const signUpButton = () => {
    setModalContent(<SignUpForm />);
    setModalOpenStatus(true);
  }

  return (
    <>
      <div className="homePage">
        <div className="homeContentContainer">
          <h1>Java-Gram</h1>
          <button onClick={ logInButton }>Log In</button>
          <button onClick={ signUpButton }>Sign Up</button>
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