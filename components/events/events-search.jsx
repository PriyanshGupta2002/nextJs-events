import React, { useRef } from 'react'
import classes from './eventsSearch.module.css'
import {useRouter} from 'next/router'
const EventsSearch = (props) => {
    const router =useRouter()
    const yearRef = useRef()
    const monthRef = useRef()
    
    const searchHandler=(e)=>{
        e.preventDefault()
        const enteredYear = yearRef.current.value
        const enteredMonth = monthRef.current.value
        props.onSearch(enteredYear,enteredMonth)
    }

  return (
    <form action="" className={classes.form} onSubmit={searchHandler}>
        <div className={classes.controls}>
            <div className={classes.control}>
                <label htmlFor="year">Year</label>
                <select name="" id="year" ref={yearRef} >
                    <option value="2021" >2021</option>
                    <option value="2022">2022</option>
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor="month">Month</label>
                <select name="" id="month" ref={monthRef}>

                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    
                </select>
            </div>
        </div>
        <button className={classes.btn}>Browse Event</button>
    </form>

  )
}

export default EventsSearch