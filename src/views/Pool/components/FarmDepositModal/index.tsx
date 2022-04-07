import { FC, useCallback, useState } from "react";
import TransactionConfirmationModal, {
  ConfirmationModalContent,
} from "@components/TransactionConfirmationModal";
import { Token } from "@uniswap/sdk-core";
import { useActiveWeb3React } from "@hooks/web3";
import { useMasterHummusAddress } from "@hooks/useAddress";
import { useFarmStaked } from "@views/Pool/hooks/useFarmStaked";
import { useTokenBalance } from "@state/wallet/hooks";
import { CurrencyInput } from "@components/CurrencyInput";
import { useDepositFarm } from "@hooks/calls/farm/useDepositFarm";
import { tryParseAmount } from "@utils/tryParseAmount";
import { useFarmDepositModalToggle } from "@state/application/hooks";
import ApprovedAction from "@components/ApprovedAction";

export const FarmDepositModal: FC<{
  pid?: number;
  token?: Token;
  lpToken?: Token;
}> = ({ pid, token, lpToken }) => {
  const { account } = useActiveWeb3React();
  const [toggleFarmDeposit, isOpen] = useFarmDepositModalToggle();

  const farmAddress = useMasterHummusAddress();
  const farmStaked = useFarmStaked(pid, lpToken);
  const tokenBalance = useTokenBalance(account, lpToken);
  const farmBalance = useTokenBalance(farmAddress, lpToken);

  const [value, setValue] = useState("");
  const [attemptingTxn, setAttemptingTxn] = useState(false);
  const [hash, setHash] = useState("");

  const { onDeposit } = useDepositFarm(pid);

  const handleDeposit = useCallback(async () => {
    setAttemptingTxn(true);
    try {
      const tx = await onDeposit(tryParseAmount(value, lpToken));
      setAttemptingTxn(false);
      setHash(tx.hash);
    } catch (e) {
      console.log(e);
      setAttemptingTxn(false);
    }
  }, [lpToken, onDeposit, value]);

  const topContent = () => {
    return (
      <>
        <div className="text-dark/40 flex items-center font-medium justify-between gap-5 flex-wrap">
          <p>
            Staked: {farmStaked?.toFixed(2)} {token?.symbol}
          </p>
          <p>
            Stakable:{" "}
            <span className="text-dark font-semibold">
              {tokenBalance?.toFixed(2)} {token?.symbol}
            </span>
          </p>
        </div>
        <CurrencyInput
          id="farm-deposit"
          value={value}
          onUserInput={(e) => setValue(e)}
          onMax={() => setValue(tokenBalance?.toFixed(lpToken.decimals))}
          currency={lpToken}
          showMaxButton
        />

        <div className="flex items-center font-medium justify-between">
          <div>
            <p>Tokens Staked</p>
          </div>
          <div>
            <p>
              {farmBalance?.toFixed(2)} {token?.symbol}
            </p>
          </div>
        </div>
      </>
    );
  };

  const bottomContent = () => {
    return (
      <>
        <div className="flex items-center font-medium justify-between">
          <a
            className="w-1/2 text-center py-3 font-medium cursor-pointer rounded-md hover:bg-darkBlue/5 duration-100 text-dark/40 select-none block !bg-darkOrange !text-white mr-8"
            onClick={toggleFarmDeposit}
          >
            Cancel
          </a>
          <ApprovedAction
            className="w-1/2 text-center py-3 font-medium rounded-md hover:bg-darkBlue/5 duration-100 text-dark/40 select-none block !bg-darkOrange !text-white"
            token={lpToken}
            spender={farmAddress}
            action="Stake"
            onAction={handleDeposit}
          />
        </div>
      </>
    );
  };

  const content = () => {
    return (
      <ConfirmationModalContent
        topContent={topContent}
        bottomContent={bottomContent}
      />
    );
  };

  return (
    <TransactionConfirmationModal
      title={`Confirm Stake ${token?.symbol}`}
      isOpen={isOpen}
      onDismiss={toggleFarmDeposit}
      attemptingTxn={attemptingTxn}
      pendingText={`Confirm Stake ${tryParseAmount(value, lpToken)?.toFixed(
        2
      )} ${token?.symbol}`}
      hash={hash}
      content={content}
    />
  );
};
