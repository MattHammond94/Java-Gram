import { useSelector } from "react-redux";
import LogOutButton from "../components/LogOutButton";

const FeedPage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="feed-page">
      <h1>Feed Page</h1>
      <h1>{ userInfo.username }</h1>
      <LogOutButton />
    </div>
  )
}

export default FeedPage