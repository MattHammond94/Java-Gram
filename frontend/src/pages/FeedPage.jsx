import { useSelector } from "react-redux";
import LogOutButton from "../components/LogOutButton";
import CreatePostButton from "../components/CreatePostButton";
import Feed from "../components/Feed";
import CreatePostForm from "../components/CreatePostForm";

const FeedPage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="feed-page">
      <h1>Feed Page</h1>
      <h1>{ userInfo.username }</h1>
      <LogOutButton />
      <CreatePostForm />
      <Feed />
      <CreatePostButton />
    </div>
  )
}

export default FeedPage