import { createContext, useState } from "react";

const NotificationContext  = createContext({
   notification:null,
   showNotificaton:(notificationData)=>{},
   hideNotification:()=>{}
})

export const NotificationContextProvider=(props)=>{
    const [activeNotification,setActiveNotifiction]=useState()
    const showNotificaton=(notificationData)=>{
        setActiveNotifiction(notificationData)
    }
    const hideNotification=()=>{
        setActiveNotifiction(null)
    }
    
    const context={
        notification:activeNotification,
        showNotificaton:showNotificaton,
        hideNotification:hideNotification
    }
    return(
    <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>
    )
}
export default NotificationContext