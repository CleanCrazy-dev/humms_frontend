import { Pool } from "@config/types"
import { CONTRACTS } from "./contracts"
import { TOKENS } from "./tokens"

export const ALL_POOL_IDS = [
  0, 1, 2
]

export const POOLS: Pool[] = [
  {
    pool: CONTRACTS.pool,
    token: TOKENS.USDC,
    farm: {
      pid: 0,
      token: TOKENS.HLPUSDC,
    },
  },
  {
    pool: CONTRACTS.pool,
    token: TOKENS.USDT,
    farm: {
      pid: 1,
      token: TOKENS.HLPUSDT,
    },
  },
  {
    pool: CONTRACTS.pool,
    token: TOKENS.DAI,
    farm: {
      pid: 2,
      token: TOKENS.HLPDAI,
    },
  },
]