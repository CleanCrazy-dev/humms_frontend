import PoolItem from "@views/Pool/components/PoolItem";
import { TradeModal } from "@views/Pool/components/TradeModal";
import HumTrade from "@views/Pool/components/HumTrade";
import { POOLS } from "@config/constants/pools";
import { PoolDepositModal } from "./components/PoolDepositModal";
import { FarmDepositModal } from "./components/FarmDepositModal";
import FarmRewards from "./components/FarmRewards";
import { useState } from "react";
import { Token } from "@uniswap/sdk-core";

const Pool = () => {
  const [token, setToken] = useState<Token>()
  const [lpToken, setLpToken] = useState<Token>()
  const [pid, setPid] = useState<number>()

  return (
    <>
      <TradeModal />
      <PoolDepositModal token={token} lpToken={lpToken}  />
      {/* <PoolWithdrawModal /> */}
      <FarmDepositModal pid={pid} token={token} lpToken={lpToken} />
      {/* <FarmWithdrawModal /> */}
      {/* <FarmClaimModal /> */}

      <main className="px-5">
        <section className="xl:w-[1064px] mx-auto mt-12">
          <HumTrade />
          <FarmRewards />
          <div className="mt-4 mb-8 space-y-4">
            {POOLS.map((pool, index) => (
              <PoolItem key={index} pool={pool} setToken={setToken} setLpToken={setLpToken} setPid={setPid} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Pool;