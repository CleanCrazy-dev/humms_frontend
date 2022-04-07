import { Contract } from '@ethersproject/contracts';
import ERC20_ABI from '@config/abi/ERC20.json';
// import ERC20_BYTES32_ABI from '~/abis/erc20_bytes32.json';
import { ERC20 } from '@config/abi/types/ERC20';
import { useContract } from './useContract';
import { Address } from '@config/types';

export function useTokenContract(tokenAddress?: string | Address | undefined, withSignerIfPossible?: boolean) {
  return useContract<ERC20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

// export function useBytes32TokenContract(
//   tokenAddress?: string,
//   withSignerIfPossible?: boolean
// ): Contract | null {
//   return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
// }