import ABI from '@config/abi/Pool.json';
import { Pool } from '@config/abi/types';
import { CONTRACTS } from '@config/constants/contracts';
import { useActiveWeb3React } from '@hooks/web3';
import { useContract } from './useContract';

export function usePoolContract() {
  const { chainId } = useActiveWeb3React()
  return useContract<Pool>(CONTRACTS.pool[chainId], ABI, true);
}