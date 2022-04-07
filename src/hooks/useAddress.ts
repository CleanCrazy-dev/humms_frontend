import { CONTRACTS, TOKENS } from "@config";
import { Address } from "@config/types";
import { useMemo } from "react";
import { useActiveWeb3React } from "./web3";

export const useAddress = (address: Address): string => {
  const { chainId } = useActiveWeb3React()

  return useMemo(() => address[chainId ?? 1088], [address, chainId]);
};

export const useHummusAddress = () => {
  return useAddress(TOKENS.HUM.address)
}

export const useMasterHummusAddress = () => {
  return useAddress(CONTRACTS.masterHummus)
}

export const usePoolAddress = () => {
  return useAddress(CONTRACTS.pool)
}

export const useRouterAddress = () => {
  return useAddress(CONTRACTS.router)
}

export const useVeHumAddress = () => {
  return useAddress(CONTRACTS.veHum)
}
