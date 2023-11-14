// import { useAddLikeToPostMutation } from "../slices/postApiSlice";
// import { useState } from "react";

// const AddLikeButton = ({ postId, currentLikes }) => {
//   const[likeCount, setLikeCount] = useState(currentLikes);
//   const [like] = useAddLikeToPostMutation();

//   const handleLike = async () => {
//     const updatedPost = await like({ id: postId });
//     setLikeCount(updatedPost.data.likedBy.length);
//   }

//   return (
//     <div className="likeSection">
//       <p>{ `${likeCount} likes` }</p>
//       <div onClick={ handleLike }>
//         <FontAwesomeIcon icon={faHeart} />
//       </div>
//     </div>
//   )
// }

// export default AddLikeButton