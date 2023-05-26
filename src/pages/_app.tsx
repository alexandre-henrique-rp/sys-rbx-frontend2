import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { FunctionComponent } from "react";
import "../styles/globals.css";
import Layout from "@/component/provaider";
import AppHead from "@/component/elements/head";

interface MyAppProps {
  Component: FunctionComponent<any>;
  pageProps: {
    session: any;
    [key: string]: any;
  };
}

const MyApp: FunctionComponent<MyAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <AppHead favicon="https://rbx-backend-media.s3.sa-east-1.amazonaws.com/thumbnail_logotipo_ribermax_180x180_min_06701e43ad.webp" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default MyApp;
