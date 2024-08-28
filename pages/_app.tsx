import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";

import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "@ui/services/queryClient";
import { AuthProvider } from "@/src/ui/context/AuthContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Component {...pageProps} />
            <ToastContainer theme="colored" position="bottom-center" />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};
export default MyApp;
