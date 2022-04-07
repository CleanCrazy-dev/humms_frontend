import ABI from '@config/abi/HummusRouter01.json';
import { HummusRouter01 } from '@config/abi/types';
import { CONTRACTS } from '@config/constants/contracts';
import { useActiveWeb3React } from '@hooks/web3';
import { useContract } from './useContract';

export function useRouterContract() {
  const { chainId } = useActiveWeb3React()
  return useContract<HummusRouter01>(CONTRACTS.router[chainId], ABI, true);
}