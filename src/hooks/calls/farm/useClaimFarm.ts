import { useMasterHummusV2Contract } from "@hooks/contracts/useMasterHummusContract"
import { BigNumberish } from "ethers"
import { useCallback } from "react"

export const useClaimFarm = () => {
  const masterHummus = useMasterHummusV2Contract()

  const handleClaim = useCallback(async (pids: BigNumberish[]) => {
    return masterHummus.multiClaim(pids);
  }, [masterHummus])

  return { onClaim: handleClaim }
}