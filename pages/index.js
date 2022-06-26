
import EventsList from "../components/events/Events-list"
import { getFeaturedEvents } from "../utility/util"
import Head from 'next/head'

export default function Home(props) {

  return (
   <div>
      <Head>
      <meta name="description" content="A website made to inform users about our nextJs events"/>
      <title>NextJs-Events</title>
    </Head>
    <ul>
      <EventsList events={props.getEvents}/>
    </ul>
    </div>
  )
}
export const getStaticProps=async()=>{
  const getEvents=await getFeaturedEvents()
  if (!getEvents||getEvents.length===0) {
    return {
      notFound:true
    }
  }
  return{
    props:{
      getEvents
    },
    revalidate:1800
  }
}
