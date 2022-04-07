import { useMasterHummusV2Contract } from "@hooks/contracts/useMasterHummusContract"
import { useActiveWeb3React } from "@hooks/web3"
import { useSingleCallResult } from "@state/multicall/hooks"
import { CurrencyAmount, Token } from "@uniswap/sdk-core"
import { useMemo } from "react"

export const useFarmStaked = (pid: number, token?: Token) => {
  const { account } = useActiveWeb3React()
  const masterHummus = useMasterHummusV2Contract()

  const inputs = useMemo(() => [pid, account], [pid, account])
  const userInfo = useSingleCallResult(masterHummus, 'userInfo', inputs).result

  return useMemo(() => {
    return account && userInfo && userInfo.amount ? CurrencyAmount.fromRawAmount(token, userInfo.amount) : undefined
  }, [account, token, userInfo])
}