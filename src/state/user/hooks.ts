import {
  DEFAULT_SLIPPAGE_TOLERANCE,
  DEFAULT_TXN_DEADLINE,
} from "@config/constants/misc";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import { useCallback, useMemo } from "react";
import {
  updateSwapSlippageTolerance,
  updateTxnDeadline,
  updateWithdrawSlippageTolerance,
} from "./actions";

export const useGasPrice = () => {};

export const useSwapSlippageTolerance = (): [
  number,
  (tolerance: number) => void
] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector(
      (state) => state.user.swapSlippageTolerance || DEFAULT_SLIPPAGE_TOLERANCE
    ),
    useCallback(
      (swapSlippageTolerance) =>
        dispatch(updateSwapSlippageTolerance({ swapSlippageTolerance })),
      [dispatch]
    ),
  ];
};

export const useWithdrawSlippageTolerance = (): [
  number,
  (tolerance: number) => void
] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector(
      (state) =>
        state.user.withdrawSlippageTolerance || DEFAULT_SLIPPAGE_TOLERANCE
    ),
    useCallback(
      (withdrawSlippageTolerance) =>
        dispatch(
          updateWithdrawSlippageTolerance({ withdrawSlippageTolerance })
        ),
      [dispatch]
    ),
  ];
};

export const useTxnDeadline = (): [number, (deadline: number) => void] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector((state) => state.user.txnDeadline || DEFAULT_TXN_DEADLINE),
    useCallback(
      (txnDeadline) => dispatch(updateTxnDeadline({ txnDeadline })),
      [dispatch]
    ),
  ];
};

export const useTxnDeadlineTimestamp = (): number => {
  const [txnDeadline] = useTxnDeadline();
  const deadlineSeconds = txnDeadline * 60;

  return useMemo(
    () => Math.floor(Date.now() / 1000 + deadlineSeconds),
    [deadlineSeconds]
  );
};
