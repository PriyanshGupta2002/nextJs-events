import React from 'react'
import Notification from '../ui/Notification'
import Header from './header'
import { useContext } from 'react'
import NotificationContext from '../../store/notification-context'
const Layout = (props) => {
  const notiCtx= useContext(NotificationContext)
  return (
    <>
    <Header/>
    <main>{props.children}</main>
   {notiCtx.notification && <Notification title={notiCtx.notification.title} status={notiCtx.notification.status} message={notiCtx.notification.message}/>}
    </>
  )
}

export default Layout