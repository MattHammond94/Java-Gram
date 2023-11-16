import CreatePostButton from "../components/CreatePostButton";
import Feed from "../components/Feed";
import FeedNavBar from "../components/FeedNavBar";

const FeedPage = () => {

  return (
    <div className="feedPage">
      <FeedNavBar />
      <Feed />
      <CreatePostButton />
    </div>
  )
}

export default FeedPage