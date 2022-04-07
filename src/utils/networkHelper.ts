import { NETWORKS } from "@config"

export const getRpcUrl = (chainId: number) => {
  return NETWORKS[chainId]?.rpcUrls[0]
}

export const getBlockExplorerUrl = (chainId: number) => {
  return NETWORKS[chainId]?.blockExplorerUrls[0]
}

export const getBlockExplorerAddressUrl = (chainId: number, account: string) => {
  return `${getBlockExplorerUrl(chainId)}/address/${account}`
}

export const getBlockExplorerTxUrl = (chainId: number, txHash: string) => {
  return `${getBlockExplorerUrl(chainId)}/tx/${txHash}`
}
