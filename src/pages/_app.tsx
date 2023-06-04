import "@/styles/globals.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import type { AppProps } from "next/app";
import { configureChains, createClient, useConnect, WagmiConfig } from "wagmi";
import { chainlist } from "@/config/chains";
import { Web3Modal } from "@web3modal/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import store from "../state/index";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MyContext } from "@/components/context";
import { mainnet, bsc } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const { chains, provider } = configureChains(
  [bsc],
  [w3mProvider({ projectId })]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

interface MyContextValue {
  data: string;
  setData: (data: string) => void;
}

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState("");

  const contextValue: MyContextValue = {
    data,
    setData,
  };
  return (
    <>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <MyContext.Provider value={contextValue}>
            <Component {...pageProps} />
            <ToastContainer />
          </MyContext.Provider>
        </WagmiConfig>
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeVariables={{
            "--w3m-accent-color": "#115657",
            "--w3m-logo-image-url": "/images/logo_name.png",
            "--w3m-background-color": "#115657",
          }}
        />
      </Provider>
    </>
  );
}
