import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homeContentContainer">
        <h1>Java-Gram</h1>
      
        <LogInForm />
      
        {/* <SignUpForm /> */}
      </div>
      <div className="waves layer1"></div>
    </div>
  )
}

export default HomePage;