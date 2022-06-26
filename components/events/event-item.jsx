import React from 'react'
import classes from './event-item.module.css'
import Button from '../ui/Button'
import DateIcon from '../icons/date-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import AddressIcon from '../icons/address-icon'
import Image from 'next/image'
const EventItem = (props) => {
    const {title,image,location,date,id}=props
    const getDate = new Date(date).toLocaleDateString('en-US',{
     year: 'numeric', month: 'long', day: 'numeric'
    })
    const formattedAddress= location.replace(', ', '\n')
    const exploreLink = `/events/${id}`
  return (
    <>
    <li className={classes.item}>
        <Image src={`/${image}`} alt={title} width={250} height={160} priority={true}/>
        <div className={classes.content}>

            <div className={classes.summary}>
                <h2>{title}</h2>
                <div className={classes.date}>
                    <DateIcon/>
                    <time>{getDate}</time>
                </div>
                <div className={classes.address}>
                    <AddressIcon/>
                    <address>{formattedAddress}</address>
                </div>

            </div>

            <div className={classes.actions}>
            <Button link={exploreLink}>
                <span className={classes.icon}>Explore Event <ArrowRightIcon/></span>
            </Button>
            </div>
        </div>
    </li>
    </>

  )
}

export default EventItem