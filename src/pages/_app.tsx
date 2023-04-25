// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { Provider as ReactReduxProvider } from "react-redux";
import { store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactReduxProvider store={store}>
      <Component {...pageProps} />
    </ReactReduxProvider>
  );
}
