import { useGetAllUsersPostsQuery } from "../slices/postApiSlice";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

// Icons
import { HiHeart  } from "react-icons/hi";
import { SlSpeech } from "react-icons/sl";

const UserPageGallery = ({ username }) => {
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);
  const { data: usersPosts, error: usersPostsError } = useGetAllUsersPostsQuery(selectedUserInfo?._id, {
    skip: !selectedUserInfo
  });

  if (selectedUserInfoLoading) {
    return <Loader />
  }

  if (selectedUserError || usersPostsError) {
    return <div>Error: {selectedUserError.message || usersPostsError.message}</div>;
  }

  return (
    <div className="userPageGallery">
      {usersPosts && usersPosts.map((post, index) => (
        <div key={index} className="galleryPostContainer">
          <img src={ post.image } />
          <div className="galleryIconsContainer">
            <div className="galleryLikesContainer">
              <HiHeart className="galleryIcon"/> 
              <p>{ post.likedBy.length }</p>
            </div>
            <div className="galleryCommentsContainer">
              <SlSpeech className="galleryIcon"/>
              <p>{ post.comments.length }</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserPageGallery