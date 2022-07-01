import classes from './comment-list.module.css';

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>{props.commentsList.comment}</p>
        <div>
          By <address>{props.commentsList.name}</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
