import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';
function Comments(props) {
  const { eventId } = props;
  const notiCtx = useContext(NotificationContext)
  const [showComments, setShowComments] = useState(false);
  const [Comments, setComments] = useState([])
  const fetchComment=async()=>{
    notiCtx.showNotificaton({
      "title":"Loading Comments....",
      "status":"pending",
      "message":"Be patient! We are loading comments.."
    })
    const data = await fetch(`http://localhost:3000/api/${eventId}`)
    const res = await data.json()
    console.log(res)
    notiCtx.showNotificaton({
      "title":"All Comments here...",
      "status":"success",
      "message":"Thanks for you patience!Comments here"
    })
    setTimeout(() => {
      notiCtx.hideNotification()
    }, 2000);
    setComments(res)
}
  useEffect(() => {
    if (showComments) {
        fetchComment()
      }
    
  }, [showComments])
  

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler=async(commentData)=> {
    notiCtx.showNotificaton({
      "title":"Adding Comment",
      "status":"pending",
      "message":"Adding your comment....."
    })
    const response =await fetch(`http://localhost:3000/api/${eventId}`,{
        method:"POST",
        body:JSON.stringify(commentData),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (!response.ok) {
        const data = await response.json()
        notiCtx.showNotificaton({
          "title":"Adding Comment Failes",
          "status":"error",
          "message":data.message
        })
        setInterval(() => {
          notiCtx.hideNotification()
        }, 2000);
        return
    }
    const data = await response.json()
    notiCtx.showNotificaton({
      "title":"Comment Added",
      "status":"success",
      "message":"Your comment has been added"
    })

    setTimeout(() => {
      notiCtx.hideNotification()
    }, 2000);
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
