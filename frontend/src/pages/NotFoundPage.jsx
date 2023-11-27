import { FaGhost } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <>
      <div className='notFoundPageContainer'>
        <div className="iconContainer">
          <FaGhost className="ghostIcon"/>
        </div>
        <div className="notFoundContentContainer">
          <h1>404</h1>
          <p>Nothing exists here!</p>
          <a href="/">Return home...</a>
        </div>
      </div>
      <div className="waves layer1"></div>
    </>
  )
}

export default NotFoundPage