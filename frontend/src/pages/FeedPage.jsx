import LogOutButton from "../components/LogOutButton";
import CreatePostButton from "../components/CreatePostButton";
import Feed from "../components/Feed";

const FeedPage = () => {

  return (
    <div className="feedPage">
      <LogOutButton />
      <Feed />
      <CreatePostButton />
    </div>
  )
}

export default FeedPage