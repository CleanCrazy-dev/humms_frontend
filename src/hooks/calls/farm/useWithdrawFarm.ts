import { useMasterHummusV2Contract } from "@hooks/contracts/useMasterHummusContract";
import { BigNumberish } from "ethers";
import { useCallback } from "react";

export const useWithdrawFarm = (pid: BigNumberish) => {
  const masterHummus = useMasterHummusV2Contract()

  const handleWithdraw = useCallback(async (amount: BigNumberish) => {
    return masterHummus.withdraw(pid, amount)
  }, [masterHummus, pid])

  return { onWithdraw: handleWithdraw }
}