import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};
export default MyApp;
