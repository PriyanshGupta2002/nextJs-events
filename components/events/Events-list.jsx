import React from 'react'
import EventItem from './event-item'
import classes from './EventsList.module.css'
const EventsList = (props) => {
  const {events}=props
  return (
      <ul className={classes.list}>
      {events.map((event)=>{return <EventItem  title={event.title} key={event.id} description={event.description} location={event.location} image={event.image} date={event.date} id={event.id}/>})}
      </ul>
  
  )
}

export default EventsList