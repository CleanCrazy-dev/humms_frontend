import { Network } from "@config/types";
import { ChainId } from "./web3";

// Network Config specified by EIP-3085
// EIP-3085: https://eips.ethereum.org/EIPS/eip-3085
// Metamask Usage: https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
export const NETWORKS: { [chainId: number]: Network } = {
  [ChainId.STARDUST]: {
    chainId: ChainId.STARDUST,
    chainName: "Stardust (Metis)",
    nativeCurrency: {
      name: "Metis",
      symbol: "METIS",
      decimals: 18
    },
    rpcUrls: ["https://stardust.metis.io/?owner=588"],
    blockExplorerUrls: ["https://stardust-explorer.metis.io"],
  },
  [ChainId.ANDROMEDA]: {
    chainId: ChainId.ANDROMEDA,
    chainName: "Andromeda (Metis)",
    nativeCurrency: {
      name: "Metis",
      symbol: "METIS",
      decimals: 18
    },
    rpcUrls: ["https://andromeda.metis.io/?owner=1088"],
    blockExplorerUrls: ["https://andromeda-explorer.metis.io"],
  },
}