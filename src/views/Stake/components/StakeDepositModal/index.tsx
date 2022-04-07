import TransactionConfirmationModal, { ConfirmationModalContent } from "@components/TransactionConfirmationModal"
import { useStakeDepositModalToggle } from "@state/application/hooks"
import { useState } from "react"

const StakeDepositModal = () => {
  
  const [toggleStakeDepositModal, isOpen] = useStakeDepositModalToggle()

  const [attemptingTxn, setAttemptingTxn] = useState(false)
  const [hash, setHash] = useState('')


  const topContent = () => {
    return (<></>)
  }

  const bottomContent = () => {
    return (<></>)
  }

  const content = () => {
    return (
      <ConfirmationModalContent
        topContent={topContent}
        bottomContent={bottomContent}
      />
    )
  }

  return (
    <TransactionConfirmationModal
      title={"Confirm Stake HUM"}
      pendingText={"Staking HUM..."}
      isOpen={isOpen}
      onDismiss={toggleStakeDepositModal}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={content}
    />
  )
}

export default StakeDepositModal