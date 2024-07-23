import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "@/components/ui/tooltip";

import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <TooltipProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </TooltipProvider>
    </>
  );
};
export default MyApp;
