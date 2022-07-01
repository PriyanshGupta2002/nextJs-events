import classes from './newsletter-registration.module.css';
import {useContext, useRef} from 'react'

import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
    const emailInputRef = useRef()
    const notiCtx = useContext(NotificationContext)
   async function  registrationHandler (event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value
    notiCtx.showNotificaton({
      "title":'Signing Up....',
      "message":'Registering to Newsletter',
      "status":"pending"  
    })
    const res = await fetch(`http://localhost:3000/api/newsletter`,{
        method:"POST",
        body:JSON.stringify({email:enteredEmail}),
        headers:{
            'Content-type':'application/json'
        }
    })
    if (!res.ok) {
        console.log("Some error occured")
        const data = await res.json()
        notiCtx.showNotificaton({
          "title":'Cannot signup!Please try again.',
          "message":data.message,
          "status":"error"  
        })
        setTimeout(() => {
          notiCtx.hideNotification()
        }, 2000);
        return
    }
    const data = await res.json()
    emailInputRef.current.value=""
    notiCtx.showNotificaton({
      "title":'Successfully subscribed!',
      "message":data.message,
      "status":"success"  
    })
    setTimeout(() => {
      notiCtx.hideNotification()
    }, 2000);
    console.log(data)
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
    </section>
  );
}

export default NewsletterRegistration;
