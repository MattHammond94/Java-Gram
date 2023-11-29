const OpenModalButton = ({ buttonContent, modalContent, setModalContent, setModalOpenStatus }) => {

  const handleClick = () => {
    setModalContent(modalContent);
    setModalOpenStatus(true);
  };

  return (
    <button className="openModalButton" onClick={ handleClick }>{ buttonContent }</button>
  );
}

export default OpenModalButton;