import { HiHeart  } from "react-icons/hi";
import { SlSpeech } from "react-icons/sl";

const UserPageGallery = () => {
  const usersPosts = [
    { user: "user1", likedBy: ["Somesome", "Somesomess"], comments: ["A comment", "Another Comment"], image: "/Dud.png" },
    { user: "user2", likedBy: [], comments: ["A comment"], image: "/Placeholder.jpg" },
    { user: "user2", likedBy: ["Some", "Some2"], comments: [], image: "/icon-uncropped.png" },
    { user: "user2", likedBy: [], comments: [] },
    { user: "user2", likedBy: [], comments: [] },
    { user: "user2", likedBy: [], comments: [] },
    { user: "user2", likedBy: [], comments: [] },
    { user: "user2", likedBy: [], comments: [] },
    { user: "user2", likedBy: ["Someone"], comments: [] },
    { user: "user2", likedBy: [], comments: ["Comments", "Comment2"] }
  ]

  return (
    <div className="userPageGallery">
      {usersPosts.map((post, index) => (
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