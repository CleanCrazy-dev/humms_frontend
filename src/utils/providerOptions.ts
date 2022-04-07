import WalletConnect from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

export function getWeb3ModalOptions() {
  const options = {
    network: "metis", // optional
    cacheProvider: true, // optional
    providerOptions: getProviderOptions()
  }
  return options
}

export function getProviderOptions() {
    const infuraId = 'b24a3c82890d46b3b7d757f144735af2'
    console.log("infuraId", infuraId);
    const providerOptions = {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId
        }
      },
      walletlink: {
        package: WalletLink,
        options: {
          appName: "Hummus DeFi",
          infuraId
        }
      },
    };
    return providerOptions;
  };
