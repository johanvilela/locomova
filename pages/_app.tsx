import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";

import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "@ui/services/queryClient";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};
export default MyApp;
