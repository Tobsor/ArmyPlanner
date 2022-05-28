import { AppProps } from "next/app";

import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

import "./main.scss";
import Layout from "../components/Layout/Layout";
import { AppWrapper } from "../src/context/state";

const clientSideEmotionCache = createEmotionCache();

const App = (props: AppProps) => {
  const { Component, emotionCache =
    clientSideEmotionCache, pageProps } = props;

  return (
    <AppWrapper>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport"
            content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </AppWrapper>
  );
};

export default App;
