import React, { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/error-alert/error-alert'

import { getEventById, getFeaturedEvents } from '../../utility/util'
import Head from 'next/head'
const eventDetails = (props) => {

  if (!props.event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Loading....</p>
        </ErrorAlert>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Head>
        <title>{props.event.title}</title>
        <meta name='description' content={props.event.description}/>
      </Head>
      <EventSummary title={props.event.title}/>
      <EventLogistics date={props.event.date} image={props.event.image} address={props.event.location} imageAlt={props.event.title}/>
      <EventContent>
        <p>{props.event.description}</p>
      </EventContent>
      </Fragment>
  )
   
}

export const getStaticProps=async(context)=>{
  const {params}=context
  const eventId=params.eventId
  const getAEvent = await getEventById(eventId)
  if (!getAEvent) {
    return{
      notFound:true
    }
  }
    return {props:{
      event:getAEvent
    },
    revalidate:30
  }

}
export const getStaticPaths=async()=>{
  const getEvents = await getFeaturedEvents()
  const id= getEvents.map((event)=>{return {params:{eventId:event.id}}})
  return {
    paths:  id,
    fallback:true,
  };
}
export default eventDetails