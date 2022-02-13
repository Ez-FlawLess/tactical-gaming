import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'

import { Provider } from 'react-redux'
import { store } from '../store'
import { app, auth } from '../firebase'
import AuthController from '../components/auth/AuthController'
import AuthGuard from '../components/auth/AuthGuard'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <AuthController />
      <Layout>
        <AuthGuard pageProps={pageProps}>
          <Component {...pageProps} />
        </AuthGuard>
      </Layout>
    </Provider>
  )
}

export default MyApp
