import { useSelector } from "react-redux";
import LogOutButton from "../components/LogOutButton";
import CreatePostButton from "../components/CreatePostButton";
import Feed from "../components/Feed";

const FeedPage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="feedPage">
      <h1>Feed Page</h1>
      <h1>{ userInfo.username }</h1>
      <LogOutButton />
      <Feed />
      <CreatePostButton />
    </div>
  )
}

export default FeedPage