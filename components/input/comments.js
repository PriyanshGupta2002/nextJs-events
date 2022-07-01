import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [Comments, setComments] = useState([])
  const fetchComment=async()=>{
    const data = await fetch(`http://localhost:3000/api/${eventId}`)
    const res = await data.json()
    console.log(res)
    setComments(res)
}
  useEffect(() => {
    if (showComments) {
        // const fetchComment=async()=>{
        //     const data = await fetch(`http://localhost:3000/api/${eventId}`)
        //     const res = await data.json()
        //     console.log(res)
        //     setComments(res)
        
        fetchComment()
      }
    
  }, [showComments])
  

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler=async(commentData)=> {
    const response =await fetch(`http://localhost:3000/api/${eventId}`,{
        method:"POST",
        body:JSON.stringify(commentData),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (!response.ok) {
        const data = await response.json()
        return
    }
    const data = await response.json()
    setComments([data.comment,...Comments])

  }


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && Comments.map((comment)=>{ return <CommentList key={comment._id} commentsList={comment}/>})}

    </section>
  );
}

export default Comments;
