import { Web3Provider } from '@ethersproject/providers';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { InjectedConnector } from '@web3-react/injected-connector';
// import { PortisConnector } from '@web3-react/portis-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import getLibrary from '@utils/getLibrary';
// import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';
import { SupportedChainId, ALL_SUPPORTED_CHAIN_IDS } from '@config/constants/web3';

const INFURA_KEY = '';
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
}



const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.STARDUST]: "https://stardust.metis.io/?owner=588",
  [SupportedChainId.ANDROMEDA]: "https://andromeda.metis.io/?owner=1088",
};

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1088,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const gnosisSafe = typeof window === 'undefined' ? null : new SafeAppConnector();

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  qrcode: true,
});

// mainnet only
// export const fortmatic = new FortmaticConnector({
//   apiKey: FORMATIC_KEY ?? '',
//   chainId: 1,
// });

// mainnet only
// export const portis = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks: [1],
// });

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: "https://andromeda.metis.io/?owner=1088",
  appName: 'Hummus Exchange',
  appLogoUrl: '',
});