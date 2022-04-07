import { ChainId, CONTRACTS, TOKENS } from "@config";
import { Address } from "@config/types";

export const getAddress = (address: Address, chainId?: ChainId): string => {
  return address[chainId] ? address[chainId] : address[ChainId.ANDROMEDA]; 
}

export const getBalanceAddress = (chainId?: ChainId) => {
  return getAddress(CONTRACTS.balance, chainId)
}

export const getHummusAddress = (chainId?: ChainId) => {
  return getAddress(TOKENS.HUM.address, chainId)
}

export const getMasterHummusAddress = (chainId?: ChainId) => {
  return getAddress(CONTRACTS.masterHummus, chainId)
}

export const getMulticallAddress = (chainId?: ChainId) => {
  return getAddress(CONTRACTS.multicall, chainId)
}

export const getPoolAddress = (chainId?: ChainId) => {
  return getAddress(CONTRACTS.pool, chainId)
}

export const getRouterAddress = (chainId?: ChainId) => {
  return getAddress(CONTRACTS.router, chainId)
}

export const getVeHumAddress = (chainId?: ChainId) => {
  return getAddress(CONTRACTS.veHum, chainId)
}