import "../styles/globals.css";
import BigNumber from "bignumber.js";
import { Provider } from "react-redux";
import store from "@state";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import dynamic from "next/dynamic";
import Header from "@components/Header";
import NavBar from "@components/NavBar";
import { useRouter } from "next/router";
import ApplicationUpdater from "@state/application/updater";
import MulticallUpdater from "@state/multicall/updater";
import TransactionUpdater from "@state/transactions/updater";
import { FC } from "react";
import { Store } from "@reduxjs/toolkit";
import getLibrary from "@utils/getLibrary";
import { ToastContainer } from "react-toastify";
import WalletModal from "@components/WalletModal";
import SettingsModal from "@components/SettingsModal";
import { AlertManager } from "@components/Alert";
import TokenModal from "@components/TokenModal";

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const Web3ReactDefaultProvider = dynamic(
  () => import("@components/Web3ReactDefaultProvider"),
  { ssr: false }
);

const Providers: FC<{ store: Store }> = ({ children, store }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactDefaultProvider getLibrary={getLibrary}>
        <Provider store={store}>{children}</Provider>
      </Web3ReactDefaultProvider>
    </Web3ReactProvider>
  );
};

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Providers store={store}>
      <Updaters />

      <div
        style={{
          backgroundImage: "url('/images/body_bg.svg')",
        }}
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      >
        <Header />
        <div className="grow">
          <NavBar path={router.pathname} />
          <Component {...pageProps} />
        </div>
      </div>

      <WalletModal />
      <SettingsModal />
      <TokenModal />

      <AlertManager />
      <ToastContainer position="bottom-right" />
    </Providers>
  );
}

export default MyApp;
