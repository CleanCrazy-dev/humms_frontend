import { FC, useCallback, useState } from "react";
import { useDepositPool } from "@hooks/calls/pool/useDepositPool";
import { usePoolAddress } from "@hooks/useAddress";
import TransactionConfirmationModal, {
  ConfirmationModalContent,
} from "@components/TransactionConfirmationModal";
import { Token } from "@uniswap/sdk-core";
import { CurrencyInput } from "@components/CurrencyInput";
import { useActiveWeb3React } from "@hooks/web3";
import { useTokenBalances } from "@state/wallet/hooks";
import { useTotalSupply } from "@hooks/calls/token/useTotalSupply";
import { tryParseAmount } from "@utils/tryParseAmount";
import { usePoolDepositModalToggle } from "@state/application/hooks";
import ApprovedAction from "@components/ApprovedAction";

export const PoolDepositModal: FC<{ token?: Token; lpToken?: Token }> = ({
  token,
  lpToken,
}) => {
  const { account } = useActiveWeb3React();
  const balances = useTokenBalances(account, [token, lpToken]);
  const totalSupply = useTotalSupply(lpToken);
  const poolAddress = usePoolAddress();
  const [togglePoolDepositModal, isOpen] = usePoolDepositModalToggle();

  const [value, setValue] = useState("");
  const [attemptingTxn, setAttemptingTxn] = useState(false);
  const [hash, setHash] = useState("");

  const { onDeposit } = useDepositPool();

  const handleDeposit = useCallback(async () => {
    setAttemptingTxn(true);
    try {
      const tx = await onDeposit(token.address, tryParseAmount(value, token));
      setAttemptingTxn(false);
      setHash(tx.hash);
    } catch (e) {
      console.log(e);
      setAttemptingTxn(false);
    }
  }, [onDeposit, token, value]);

  const topContent = () => {
    return (
      <>
        <div className="text-dark/40 flex items-center font-medium justify-between gap-5 flex-wrap">
          <p>
            Deposited: {balances[lpToken.address]?.toFixed(2)} {token?.symbol}
          </p>
          <p>
            Balance:{" "}
            <span className="text-dark font-semibold">
              {balances[token.address]?.toFixed(2)} {token.symbol}
            </span>
          </p>
        </div>

        <CurrencyInput
          id="pool-deposit"
          value={value}
          onUserInput={(e) => setValue(e)}
          onMax={() =>
            setValue(balances[token.address]?.toFixed(token.decimals))
          }
          currency={token}
          showMaxButton
        />

        <div className="flex items-center font-medium justify-between">
          <div>
            <p>Token Price</p>
            <p>Fee:</p>
          </div>
          <div>
            <p>$0.999842</p>
            <p>0.00 {token?.symbol}</p>
          </div>
        </div>
        <div className="flex items-center font-medium justify-between">
          <div>
            <p>My Liquidity</p>
            <p>Pool Share</p>
          </div>
          <div>
            <p>0.00 {token?.symbol}</p>
            <p>
              {(
                (Number(balances[lpToken.address]?.toFixed(2)) /
                  Number(totalSupply?.toFixed(2))) *
                100
              )?.toFixed(2)}
              %
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
            onClick={togglePoolDepositModal}
          >
            Cancel
          </a>
          <ApprovedAction
            className="w-1/2 text-center py-3 font-medium rounded-md hover:bg-darkBlue/5 duration-100 text-dark/40 select-none block !bg-darkOrange !text-white"
            token={token}
            spender={poolAddress}
            action="Deposit"
            onAction={handleDeposit}
            rawAmount={value}
          />
        </div>
        <div className="text-center">
          <p>
            In bankrun situation, LPs might only be able to withdraw in the
            over-covered tokens
          </p>
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
      title={`Confirm Deposit ${token?.symbol}`}
      isOpen={isOpen}
      onDismiss={togglePoolDepositModal}
      hash={hash}
      attemptingTxn={attemptingTxn}
      pendingText={`Deposit ${tryParseAmount(value, token)?.toFixed(3)} ${
        token?.symbol
      }`}
      content={content}
    />
  );
};
