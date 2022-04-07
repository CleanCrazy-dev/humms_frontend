import { useAssetContract } from "@hooks/contracts/useAssetContract"
import { useSingleContractWithCallData } from "@state/multicall/hooks"
import { BigNumber } from "ethers"
import { parseEther } from "ethers/lib/utils"
import { useMemo } from "react"

// return calculated coverage ratio scaled by 1e18 for a given asset
const useCoverageRatio = (assetAddress?: string): BigNumber | undefined => {
  const asset = useAssetContract(assetAddress)

  const callDatas = useMemo(() => {
    if (!assetAddress || !asset) {
      return []
    }
    return [
      asset.interface.encodeFunctionData('underlyingTokenBalance'),
      asset.interface.encodeFunctionData('totalSupply'),
    ]
  }, [assetAddress, asset])

  const results = useSingleContractWithCallData(asset, callDatas)

  const underlyingTokenBalance: BigNumber = results?.[0]?.result?.[0]
  const totalSupply: BigNumber = results?.[1]?.result?.[0]

  return useMemo(() => {
    if (assetAddress && asset && underlyingTokenBalance && totalSupply.gt(0)) {
      return underlyingTokenBalance.mul(parseEther('1')).div(totalSupply)
    }
    return undefined
  }, [assetAddress, asset, totalSupply, underlyingTokenBalance])
}

export default useCoverageRatio