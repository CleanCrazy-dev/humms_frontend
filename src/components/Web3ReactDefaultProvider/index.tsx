// https://github.com/NoahZinsmeister/web3-react/issues/176

import { createWeb3ReactRoot } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { NetworkContextName } from '@config/constants/misc';

const Web3ReactDefaultProviderRoot = createWeb3ReactRoot(NetworkContextName)

function Web3ReactDefaultProvider({
  children,
  getLibrary,
}: {
  children: JSX.Element;
  getLibrary: (provider?: any, connector?: Required<Web3ReactContextInterface>['connector']) => any;
}) {
  return <Web3ReactDefaultProviderRoot getLibrary={getLibrary}>{children}</Web3ReactDefaultProviderRoot>;
}

export default Web3ReactDefaultProvider;
