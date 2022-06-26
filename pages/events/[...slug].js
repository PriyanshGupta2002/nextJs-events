import React, { Fragment, useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import EventsList from '../../components/events/Events-list'
import ResultsTitle from '../../components/results-title/results-title'
import ErrorAlert from '../../components/error-alert/error-alert'
import Button from '../../components/ui/Button'
import useSWR from 'swr'
import Head from 'next/head'
const filteredEvents = () => {
  
  const [eventData, seteventData] = useState()
  const router  = useRouter()
  const filteredData=router.query.slug
  
  const fetcher = (url) => fetch(url).then((res) => res.json());  
const { data, error } = useSWR('https://reacct-bc1ec-default-rtdb.firebaseio.com/events.json', fetcher)
  useEffect(() => {
    if (data) {
      const transformedData=[]
      const reqData=data
      for (const key in reqData) {
        transformedData.push({id:key,title:data[key].title,description:data[key].description,location:data[key].location,date:data[key].date,image:data[key].image,isFeatured:data[key].isFeatured})
      }
      seteventData(transformedData)     
    }
 
  }, [data])
  if(!filteredData){
    return <p>Loading.....</p>
  }

 
  const year = filteredData[0]
  const month =filteredData[1]
 
  const numyear=+year
  const nummonth=+month

  const tagReq = (<Head>
  <title>Filtered Events</title>
  <meta name='description' content={`All events for ${numyear}/${nummonth}`} />
</Head>)


if (!eventData) {
  return (
    <>

    <ErrorAlert>
      Loading....
    </ErrorAlert>
    </>
    ) 
  }

  
  if (isNaN(year) || isNaN(month) || month>12 || month<1 || year>2030 || year<2021||error) {
    return(
      <Fragment>
         {tagReq}
        <ErrorAlert>
          <p>Invalid filter! Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  } 

  
  const getFilteredEvents = eventData.filter((event)=>{
    const eventDate = new Date(event.date)
    return eventDate.getFullYear()===numyear && eventDate.getMonth()===nummonth-1
  })  

  if(!getFilteredEvents||getFilteredEvents.length===0) {
    return (
      <Fragment>
         {tagReq}
        <ErrorAlert>
        <p className='center'><strong>No Events found</strong>  for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }
  
  const date = new Date(numyear,nummonth-1)

  return (
    <div>
     {tagReq}
    <ul>
      <ResultsTitle date={date}/>
      <EventsList events={getFilteredEvents}/>
    </ul>
    </div>
  )
}

export default filteredEvents