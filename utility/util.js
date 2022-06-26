export const getData=async()=>{
    const events =[]
    const response = await fetch('https://reacct-bc1ec-default-rtdb.firebaseio.com/events.json')

    if (response.ok) {
      const data = await response.json()
      for (const key in data) {
       events.push({id:key,title:data[key].title,description:data[key].description,location:data[key].location,date:data[key].date,image:data[key].image,isFeatured:data[key].isFeatured})
      }
      return events
    }
    else{
      console.log("error")
    }
  }
  export const getFeaturedEvents=async()=>{
    const eventData = await getData()
    const featuredEvents=eventData.filter((event)=>{return event.isFeatured})
    return featuredEvents
  }
  export const getEventById=async(eventId)=>{
    const eventData = await getData()
    const featuredEvents=eventData.find((event)=>{return event.id===eventId})
    return featuredEvents
  }
  export const getFilteredEvents=async(dateObject)=>{
    const {month,year}=dateObject
    const eventData = await getData()
    const filteredEvents=eventData.filter((event)=>{
      const fildate=new Date(event.date)
      return fildate.getFullYear()===year&&fildate.getMonth()===month-1
    })
    return filteredEvents
  }
  
