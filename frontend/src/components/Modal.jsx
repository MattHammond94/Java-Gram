import ReactDOM from "react-dom";

const Modal = ({status, children, setStatus, contentLoading}) => {

  console.log(contentLoading);

  if (!status) return null

  return ReactDOM.createPortal(
    <>
      <div className="modalContainer">
        <p className="modalCloseButton" style={{ display: contentLoading ? 'none' : 'block' }} onClick={ () => setStatus(false) }>&#215;</p>
        <div className="modalContentContainer">
          { children }
        </div>
      </div>
    </>, document.getElementById('modal')
  )
}

export default Modal