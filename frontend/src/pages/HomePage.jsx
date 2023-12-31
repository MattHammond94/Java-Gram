import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import Modal from "../components/Modal";
import OpenModalButton from "../components/OpenModalButton";

const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate('/feed')
    }
  }, [navigate, userInfo])

  return (
    <>
      <div className="homePage">
        <div className="homeContentContainer">
          <h1>Java-Gram</h1>
          <OpenModalButton 
            buttonContent={ "Log In" }
            modalContent={ <LogInForm setContentLoadingStatus={ setContentLoading }/> }
            setModalContent={ setModalContent }
            setModalOpenStatus={ setModalOpenStatus }
          />
          <OpenModalButton
            buttonContent={ "Sign Up" }
            modalContent={ <SignUpForm setContentLoadingStatus={ setContentLoading }/> }
            setModalContent={ setModalContent }
            setModalOpenStatus={ setModalOpenStatus }
          />
        </div>
        <div className="waves layer1"></div>
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} contentLoading={contentLoading}>
        { modalContent }
      </Modal>
    </>
  )
}

export default HomePage;