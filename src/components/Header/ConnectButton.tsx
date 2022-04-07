import WalletModal from "@components/WalletModal"
import { useWalletModalToggle } from "@state/application/hooks"
import { useCallback } from "react"

export const ConnectButton = () => {

  const [toggleWalletModal] = useWalletModalToggle()

  const onConnect = useCallback(() => {
    toggleWalletModal()
  }, [toggleWalletModal])

  return (
    <button className="button" onClick={onConnect}>
      Connect wallet
    </button>
  )
}