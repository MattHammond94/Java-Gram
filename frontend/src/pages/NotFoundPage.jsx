import { FaGhost } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <>
      <div className='notFoundPageContainer'>
        <div className="iconContainer">
          <FaGhost className="ghostIcon"/>
        </div>
        <div className="notFoundLine"></div>
        <div className="notFoundContentContainer">
          <h1 data-testid="error-code">404</h1>
          <p data-testid="indicator">Nothing exists here!</p>
          <a data-testid="anchor-tag" href="/">Return home...</a>
        </div>
      </div>
      <div data-testid="waves" className="waves layer1"></div>
    </>
  )
}

export default NotFoundPage