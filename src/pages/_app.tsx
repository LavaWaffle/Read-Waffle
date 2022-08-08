// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import superjson from "superjson";
import "../styles/globals.css";

// mantine imports
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

// component imports
import Head from 'next/head';
import Layout from "@/components/layout";
// import { GameContextProvider, useGameContext } from "@/context/GameContext";
// import { IconCheck, IconX } from "@tabler/icons";

const MyApp = (props: AppProps & { colorScheme: ColorScheme }) => {
  const { Component, pageProps } = props;
  const [localColorScheme, setLocalColorScheme] = useLocalStorage<ColorScheme>({ 
    key: 'mantine-color-scheme',
    defaultValue: props.colorScheme,
    serialize: superjson.stringify,
    deserialize: (str) => (str === undefined ? props.colorScheme : superjson.parse(str)),
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (localColorScheme === 'dark' ? 'light' : 'dark');
    setLocalColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <>
      <Head>
        <title>Scout Waffle</title>
        <meta name="description" content="Scout Waffle" />
        <link rel="icon" href="/waffle2.png" />
      </Head>
      <ColorSchemeProvider colorScheme={localColorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme: localColorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="top-right">
            {/* <GameContextProvider> */}
              <Layout> 

                  <Component {...pageProps} />

              </Layout>   
            {/* </GameContextProvider> */}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

// get color scheme
MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
