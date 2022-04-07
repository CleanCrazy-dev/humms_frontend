import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouterContract } from "@hooks/contracts/useRouter";
import { useActiveWeb3React } from "@hooks/web3";
import { usePoolAddress } from "@hooks/useAddress";
import TransactionConfirmationModal, {
  ConfirmationModalContent,
} from "@components/TransactionConfirmationModal";
import { useSwapModalToggle } from "@state/application/hooks";
import { useToken } from "@hooks/Tokens";
import ApprovedAction from "@components/ApprovedAction";
import {
  useMinimumAccepted,
  useSelectedToken,
  useSwapData,
  useSwapRate,
} from "@state/swap/hooks";
import useSwapTokensForTokens from "@hooks/calls/router/useSwapTokensForTokens";
import { useTxnDeadlineTimestamp } from "@state/user/hooks";

export const SwapModal = () => {
  const { account, chainId } = useActiveWeb3React();
  const [toggleSwapModal, isOpen] = useSwapModalToggle();
  const [swapData] = useSwapData();
  const [fromInfo] = useSelectedToken("from");
  const [toInfo] = useSelectedToken("to");
  const swapRate = useSwapRate();
  const minimumAccepted = useMinimumAccepted();
  const deadline = useTxnDeadlineTimestamp();

  const fromToken = useToken(fromInfo?.address[chainId]);
  const toToken = useToken(toInfo?.address[chainId]);

  const { onSwapTokensForTokens } = useSwapTokensForTokens();

  const poolAddress = usePoolAddress();
  const router = useRouterContract();

  const [attemptingTxn, setAttemptingTxn] = useState(false);
  const [hash, setHash] = useState("");

  const handleSwap = useCallback(async () => {
    setAttemptingTxn(true);
    try {
      const tx = await onSwapTokensForTokens(
        [fromToken?.address, toToken?.address],
        [poolAddress],
        swapData?.input?.quotient.toString(),
        minimumAccepted?.quotient.toString(),
        account,
        deadline
      );
      setAttemptingTxn(false);
      setHash(tx.hash);
    } catch (e) {
      console.log(e);
      setAttemptingTxn(false);
    }
  }, [
    account,
    deadline,
    swapData,
    toToken,
    fromToken,
    setHash,
    setAttemptingTxn,
    minimumAccepted,
    poolAddress,
    onSwapTokensForTokens,
  ]);

  const topContent = () => {
    return (
      <>
        <div className="space-y-3 w-full">
          <div className="rounded-xl bg_dark_4 flex items-center font-medium justify-between gap-5 h-12">
            <div className="grow-0 ml-8">
              <input
                type="text"
                placeholder="0.00"
                className="w-full text-dark outline-none border-none bg-transparent"
                value={swapData?.input?.toExact()}
                readOnly
              />
            </div>
            <div className="flex shrink-0 mr-4">
              <div className="flex items-center">
                <p className="mr-2">{fromInfo?.symbol}</p>
                <Image
                  src={fromInfo?.logoUrl}
                  alt={fromInfo?.symbol}
                  width={25}
                  height={25}
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg_dark_4 flex items-center font-medium justify-between gap-5 h-12 mt-2">
            <div className="grow-0 ml-8">
              <input
                type="text"
                placeholder="0.00"
                className="w-full text-dark outline-none border-none bg-transparent"
                value={swapData?.potentialOutput?.toExact()}
                readOnly
              />
            </div>
            <div className="flex shrink-0 mr-4">
              <div className="flex items-center">
                <p className="mr-2">{toInfo?.symbol}</p>
                <Image
                  src={toInfo?.logoUrl}
                  alt={toInfo?.symbol}
                  width={25}
                  height={25}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center font-medium justify-between mt-2">
            <div>
              <p>Rate</p>
              <p>Price Impact</p>
            </div>
            <div>
              <p>
                1 {fromToken?.symbol} = {swapRate} {toToken?.symbol}
              </p>
              <p className="text-right">{}%</p>
            </div>
          </div>
          <div className="flex items-center font-medium justify-between">
            <div>
              <p>Fee</p>
              <p>Minimum Received</p>
            </div>
            <div className="text-right">
              <p>
                {swapData?.haircut?.toExact()} {fromInfo?.symbol}
              </p>
              <p>
                {minimumAccepted?.toExact()} {toInfo?.symbol}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const bottomContent = () => {
    return (
      <div className="flex items-center font-medium justify-between mt-2">
        <a
          className="w-full text-center py-3 font-medium cursor-pointer rounded-md hover:bg-darkBlue/5 duration-100 text-dark/40 select-none block !bg-darkOrange !text-white mr-2"
          onClick={toggleSwapModal}
        >
          Cancel
        </a>
        <ApprovedAction
          className="w-full text-center justify-center py-3 font-medium flex items-center cursor-pointer rounded-md hover:bg-darkBlue/5 duration-100 text-dark/40 select-none !bg-darkOrange !text-white"
          token={fromToken}
          spender={router?.address}
          action="Swap"
          onAction={handleSwap}
          approveContent={
            <>
              Approve &nbsp;
              <Image
                src={fromInfo?.logoUrl}
                alt={fromInfo?.symbol}
                width={25}
                height={25}
              />
              &nbsp; {fromInfo?.symbol}
            </>
          }
        />
      </div>
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
      title="Confirm Swap"
      pendingText={`Confirm Swap`}
      isOpen={isOpen}
      onDismiss={toggleSwapModal}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={content}
    />
  );
};

export default SwapModal;
