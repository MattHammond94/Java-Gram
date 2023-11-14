import { useSelector } from "react-redux";

// Will consist of two components - A header and a gallery

// Header will contain:
// profile image (a picture that when selected)
// List of followers
// List of following
// Button to follow/unfollow
// A home button that redirects to the feed

// Gallery will contain: 
// a gallery of thumbnails from all that specific users Posts 
// each image is selectable and showcases a larger version of it.
// IF user is logged in they can delete their image here
// On delete image will need to also be deleted from the cloud library so will need to implement backend for this.


// IF the user selected(":id" in req params/link) === current users ID then extra elements will be rendered to this page 
// Extra elements will be a drop down menu that includes updating info.


const UserPage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div>
      <h1>{ userInfo.username }</h1>
    </div>
  )
}

export default UserPage