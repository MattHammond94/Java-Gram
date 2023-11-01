import ReactDOM from "react-dom";

const Modal = ({status, children, setStatus}) => {

  if (!status) return null

  return ReactDOM.createPortal(
    <>
      <div className="modalContainer">
        <p className="modalCloseButton" onClick={ () => setStatus(false) }>&#215;</p>
        <div className="modalContentContainer">
          { children }
        </div>
      </div>
    </>, document.getElementById('modal')
  )
}

export default Modal