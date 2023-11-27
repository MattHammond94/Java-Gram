import { useParams } from "react-router-dom";
import { useGetAllUsersPostsQuery } from "../slices/postApiSlice";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";

// Icons
import { HiHeart  } from "react-icons/hi";
import { SlSpeech } from "react-icons/sl";

const UserPageGallery = () => {
  const { username } = useParams();

  console.log(username)

  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  console.log(selectedUserInfo)

  const { data: usersPosts } = useGetAllUsersPostsQuery(`${selectedUserInfo?._id}`)

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