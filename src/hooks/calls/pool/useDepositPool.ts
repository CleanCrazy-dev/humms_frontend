import { usePoolContract } from "@hooks/contracts/usePool"
import { useActiveWeb3React } from "@hooks/web3"
import { CurrencyAmount, Token } from "@uniswap/sdk-core"
import { useCallback } from "react"

export const useDepositPool = () => {
  const { account } = useActiveWeb3React()
  const pool = usePoolContract()

  const deadline = Math.floor(Date.now() + 1800)

  const handleDeposit = useCallback(async (
    address: string,
    amount: CurrencyAmount<Token>
  ) => {
    return pool.deposit(address, amount.quotient.toString(), account, deadline)
  }, [account, deadline, pool])

  return {
    onDeposit: handleDeposit
  }
}