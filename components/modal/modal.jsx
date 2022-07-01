import React from 'react'
import classes from  './modal.module.css'
const Modal = (props) => {
  return (
    <div className={classes.modal}>
        <span className={classes.modalText}>{props.message}</span>
        <button onClick={()=>{props.closeModal()}} className={classes.button}>Close Modal</button>
    </div>
  )
}

export default Modal