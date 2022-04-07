import { useAssetContract } from "@hooks/contracts/useAssetContract"
import { useSingleContractWithCallData } from "@state/multicall/hooks"
import { BigNumber } from "ethers"
import { useMemo } from "react"

const useExchangeRate = (assetAddress?: string): BigNumber | undefined => {
  const asset = useAssetContract(assetAddress)

  const callDatas = useMemo(() => {
    if (!assetAddress || !asset) {
      return []
    }
    return [
      asset.interface.encodeFunctionData('cash'),
      asset.interface.encodeFunctionData('liability'),
      asset.interface.encodeFunctionData('underlyingTokenBalance'),
      asset.interface.encodeFunctionData('totalSupply'),
    ]
  }, [assetAddress, asset])

  const results = useSingleContractWithCallData(asset, callDatas)
  const cash: BigNumber = results?.[0]?.result?.[0]
  const liability: BigNumber = results?.[1]?.result?.[0]
  const underlyingTokenBalance: BigNumber = results?.[2]?.result?.[0]
  const totalSupply: BigNumber = results?.[3]?.result?.[0]

  return useMemo(() => {
    if (results && results.length > 0 && cash && liability && underlyingTokenBalance && totalSupply && totalSupply.gt(0)) {
      return (cash.add(liability).sub(underlyingTokenBalance)).div(totalSupply)
    }
    return undefined
  }, [results, cash, liability, underlyingTokenBalance, totalSupply])
}

export default useExchangeRate;