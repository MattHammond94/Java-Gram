const OpenModalButton = ({ buttonContent, modalContent, setModalContent, setModalOpenStatus  }) => {

  const handleClick = () => {
    setModalContent(modalContent);
    setModalOpenStatus(true);
  };

  return (
    <button onClick={ handleClick }>{ buttonContent }</button>
  );
}

export default OpenModalButton;