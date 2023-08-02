import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, Grid } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
     
        
          <Navbar/>
          <Component {...pageProps} />
      
    </SessionProvider>
  );
}

export default App;
