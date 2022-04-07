import { useMasterHummusV2Contract } from "@hooks/contracts/useMasterHummusContract"
import { useToken } from "@hooks/Tokens"
import { useHummusAddress } from "@hooks/useAddress"
import { useSingleCallResult, useSingleContractMultipleData } from "@state/multicall/hooks"
import { CurrencyAmount, Token } from "@uniswap/sdk-core"
import { useMemo } from "react"

export const usePendingTokens = (pids?: number[], account?: string): CurrencyAmount<Token> | undefined => {
  const masterHummus = useMasterHummusV2Contract()
  const hummusAddress = useHummusAddress()
  const hummus = useToken(hummusAddress)

  const inputs = useMemo(() => pids.map((pid) => [pid, account]), [pids, account])
  const results = useSingleContractMultipleData(masterHummus, 'pendingTokens', inputs);

  return useMemo(() => 
    results.reduce((
      total,
      curr,
      i
    ) => {
      const value = results?.[i]?.result?.pendingHum;
      if (value) {
        total.add(CurrencyAmount.fromRawAmount(hummus, value.toString()))
      }
      return total
    }, CurrencyAmount.fromRawAmount(hummus, 0)),
   [hummus, results]
  )
}