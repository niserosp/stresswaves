import '../styles/globals.css'
import Header from '../shared/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header />
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
