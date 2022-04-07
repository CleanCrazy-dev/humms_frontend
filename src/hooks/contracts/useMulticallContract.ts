import ABI from '@config/abi/multicall.json';
import { Multicall } from '@config/abi/types';
import { CONTRACTS } from '@config/constants/contracts';
import { useActiveWeb3React } from '@hooks/web3';
import { useContract } from './useContract';

export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React()
  return useContract<Multicall>(CONTRACTS.multicall[chainId], ABI, false);
}