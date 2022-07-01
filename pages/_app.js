import Layout from '../components/layout/layout'
import Head from 'next/head'
import '../styles/globals.css'
import {NotificationContextProvider} from '../store/notification-context'
function MyApp({ Component, pageProps }) {
  return (
  <NotificationContextProvider>
  <Layout>
    <Head>
      <title>React Events</title>
    <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="A website for to see nextJs upcoming events"/>
    </Head>
    <Component {...pageProps} />
    </Layout>
  </NotificationContextProvider>
    
    )
}

export default MyApp
