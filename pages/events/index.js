import React, { Fragment } from 'react'
import EventsList from '../../components/events/Events-list'
import EventsSearch from '../../components/events/events-search'
import { useRouter } from 'next/router'
import { getData } from '../../utility/util'
import Head from 'next/head'


const events = (props) => {
  const router =useRouter()
  const handleOnSearch=(year,month)=>{
    router.push(`/events/${year}/${month}`)
  }
  if (!props.getEvents) {
    return <p className='center'>
      Loading...
    </p>
  }
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
      </Head>
    <ul>
      <EventsSearch onSearch={handleOnSearch}/>
      <EventsList events={props.getEvents}/>
    </ul>
    </Fragment>
  )
}
export const getStaticProps=async()=>{
  const getEvents = await getData()
  if (!getEvents||getEvents.length===0) {
    return {
      notFound:true
    }
  }
  return {
    props:{
      getEvents
    },
    revalidate:60
  }

}

export default events