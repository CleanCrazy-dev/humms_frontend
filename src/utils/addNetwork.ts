import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '@config/constants/web3';
import { Network } from '@config/types'

interface AddNetworkArguments {
  library: Web3Provider;
  chainId: ChainId;
  info: Network;
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function addNetwork({
  library,
  chainId,
  info,
}: AddNetworkArguments): Promise<boolean | void> {
  if (!library?.provider?.request) {
    return false;
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
  try {
    const success = await library?.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: formattedChainId,
          chainName: info.chainName,
          rpcUrls: info.rpcUrls,
          nativeCurrency: info.nativeCurrency,
          blockExplorerUrls: info.blockExplorerUrls,
        },
      ],
    });

    return success
  } catch (error) {
    console.error('error adding eth network: ', chainId, info, error);
    return false;
  }
}