import React from 'react'
import classes from './button.module.css'
import Link from 'next/link'
const Button = (props) => {

    return  ( 
        <button className={classes.btn}><Link href={props.link}>{props.children}</Link></button>)
 

}

export default Button