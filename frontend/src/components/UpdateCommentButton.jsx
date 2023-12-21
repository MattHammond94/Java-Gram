
const UpdateCommentButton = () => {

  const handleUpdateComment = async(e) => {
    e.preventDefault();

    console.log('Comment Updated')
  }

  return (
    <button onClick={ (e) => handleUpdateComment(e) }>Update Comment</button>
  )
}

export default UpdateCommentButton