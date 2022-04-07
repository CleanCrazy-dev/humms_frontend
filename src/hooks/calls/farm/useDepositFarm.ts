import { useMasterHummusV2Contract } from "@hooks/contracts/useMasterHummusContract";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { useCallback } from "react";

export const useDepositFarm = (pid: number) => {
  const masterHummus = useMasterHummusV2Contract()

  const handleDeposit = useCallback(async (amount: CurrencyAmount<Token>) => {
    return masterHummus.deposit(pid, amount.quotient.toString())
  }, [masterHummus, pid])

  return { onDeposit: handleDeposit }
}