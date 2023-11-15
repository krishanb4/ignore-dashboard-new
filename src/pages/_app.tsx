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
import { publicProvider } from "@wagmi/core/providers/public";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const { chains, provider } = configureChains(
  [chainlist.bscChain, chainlist.coreDAO],
  [publicProvider()]
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
  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        enableAccountView={true}
        ethereumClient={ethereumClient}
        enableNetworkView={true}
        defaultChain={bsc}
        themeMode="dark"
        chainImages={{
          1116: "/images/coredao.png",
          8453: "/images/base.png",
        }}
        tokenImages={{
          CORE: "/images/coredao.png",
          BASE: "/images/base.png",
        }}
        themeVariables={{
          "--w3m-accent-color": "#115657",
          "--w3m-logo-image-url": "/images/logo_name.png",
          "--w3m-background-color": "#115657",
        }}
      />
    </Provider>
  );
}
