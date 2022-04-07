export const connectorLocalStorageKey = "connectorId";
export const walletLocalStorageKey = "wallet";

import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected, walletconnect, walletlink } from '@connectors';

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconURL?: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const connectorToWallet = (connector: AbstractConnector): WalletInfo => {
  let connectorKey;
  Object.keys(SUPPORTED_WALLETS).map((key) => {
    if (connector === SUPPORTED_WALLETS[key].connector) {
      return (connectorKey = key);
    }
  });
  return SUPPORTED_WALLETS[connectorKey]
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconURL: '/images/metamask.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: '/images/metamask.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconURL: '/images/walletconnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconURL: '/images/coinbase_wallet.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconURL: '/images/coinbase_wallet.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
};