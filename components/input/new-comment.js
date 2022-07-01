import { useContext, useRef, useState } from 'react';
import classes from './new-comment.module.css';
import NotificationContext from '../../store/notification-context';
function NewComment(props) {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();
  const notiCtx= useContext(NotificationContext)

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      notiCtx.showNotificaton({
        "title":"Invalid Inputs",
        "message":"Cannot add comment because of invalid input",
        "status":"error"
      })
      setTimeout(() => {
        notiCtx.hideNotification()
      }, 1000);
      return;
    }
    const commentData= {
        email:enteredEmail,
        name:enteredName,
        comment:enteredComment
    }
    props.onAddComment(commentData);
    emailInputRef.current.value=""
    nameInputRef.current.value=""
    commentInputRef.current.value=""


  }

  return (
    <>
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
      </div>
      <button className={classes.btn}>Submit</button>
    </form>
    </>
  );
}

export default NewComment;
