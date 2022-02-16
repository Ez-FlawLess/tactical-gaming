import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'

import { Provider } from 'react-redux'
import { store } from '../store'
import { app, auth } from '../firebase'
import AuthController from '../components/auth/AuthController'
import AuthGuard from '../components/auth/AuthGuard'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import LanguageController from '../components/language/LanguageController'
import GlobalLoading from '../components/loading/GlobalLoading'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)

  return (
    <Provider store={store}>
      <AuthController />
      <LanguageController />
      <GlobalLoading />
      <AuthGuard pageProps={pageProps}>
        {getLayout(<Component {...pageProps} />)}
      </AuthGuard>
    </Provider>
  )
}

export default MyApp
