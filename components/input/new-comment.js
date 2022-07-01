import { useRef, useState } from 'react';
import Backdrop from '../modal/backdrop';
import Modal from '../modal/modal';
import classes from './new-comment.module.css';

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
const [clicked, setclicked] = useState(false)
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();
  const closeModal=()=>{
    setclicked(false)
  }
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
      return;
    }
    const commentData= {
        email:enteredEmail,
        name:enteredName,
        comment:enteredComment
    }
    setIsInvalid(false)
    props.onAddComment(commentData);
    emailInputRef.current.value=""
    nameInputRef.current.value=""
    commentInputRef.current.value=""
    setclicked(true)
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
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.btn}>Submit</button>
    </form>
    {clicked && <Backdrop closeModal={closeModal}/>}
    {clicked && <Modal closeModal={closeModal} message="Comment Added Successfully!"/>}
    </>
  );
}

export default NewComment;
