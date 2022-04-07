import ABI from '@config/abi/MasterHummusV2.json';
import { MasterHummusV2 } from '@config/abi/types';
import { CONTRACTS } from '@config/constants/contracts';
import { useActiveWeb3React } from '@hooks/web3';
import { useContract } from './useContract';

export function useMasterHummusV2Contract() {
  const { chainId } = useActiveWeb3React()
  return useContract<MasterHummusV2>(CONTRACTS.masterHummus[chainId], ABI, true);
}