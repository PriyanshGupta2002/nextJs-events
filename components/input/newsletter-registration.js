import classes from './newsletter-registration.module.css';
import {useRef, useState} from 'react'
import Modal from '../modal/modal';
import Backdrop from '../modal/backdrop';
function NewsletterRegistration() {
    const emailInputRef = useRef()
    const [clicked, setclicked] = useState(false)
   async function  registrationHandler (event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value
    const res = await fetch(`http://localhost:3000/api/newsletter`,{
        method:"POST",
        body:JSON.stringify({email:enteredEmail}),
        headers:{
            'Content-type':'application/json'
        }
    })
    if (!res.ok) {
        console.log("Some error occured")
        return
    }
    const data = await res.json()
    emailInputRef.current.value=""
    setclicked(true)
    console.log(data)
  }
  const closeModal=()=>{
    setclicked(false)
  }
  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} className={classes.form}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      {clicked&&<Backdrop closeModal={closeModal}/>}
      {clicked&&<Modal closeModal={closeModal} message="Thanks for Subscribing!"/>}
    </section>
  );
}

export default NewsletterRegistration;
