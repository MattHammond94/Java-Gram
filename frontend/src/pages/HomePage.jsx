import LogInForm from "../components/LogInForm";
// import SignUpForm from "../components/SignUpForm";

const HomePage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <div>Log In</div>
      <div>Sign Up</div>

      <LogInForm />
      {/* <SignUpForm /> */}
    </div>
  )
}

export default HomePage;