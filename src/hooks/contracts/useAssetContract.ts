import ABI from '@config/abi/Asset.json';
import { Asset } from '@config/abi/types';
import { useContract } from './useContract';

export function useAssetContract(address: string) {
  return useContract<Asset>(address, ABI, true);
}