import { TokenInfo } from "@config/types";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import { useWithdrawSlippageTolerance } from "@state/user/hooks";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { useCallback, useMemo } from "react";
import {
  SelectedTokenType,
  SwapData,
  toggleSelectedTokens,
  updateSelectedToken,
  updateSelectionMode,
  updateSwapData,
} from "./actions";

export const useSelectedToken = (
  type: SelectedTokenType
): [TokenInfo | undefined, (token: TokenInfo) => void] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector((state) =>
      type === "from" ? state.swap.fromToken : state.swap.toToken
    ),
    useCallback(
      (token) => dispatch(updateSelectedToken({ type, token })),
      [dispatch, type]
    ),
  ];
};

export const useSelectionMode = (): [
  SelectedTokenType | undefined,
  (type: SelectedTokenType) => void
] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector((state) => state.swap.selectionMode),
    useCallback((type) => dispatch(updateSelectionMode({ type })), [dispatch]),
  ];
};

export const useToggleSelectedTokens = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(toggleSelectedTokens()), [dispatch]);
};

export const useSwapData = (): [
  SwapData | undefined,
  (
    input: CurrencyAmount<Token>,
    potentialOutput: CurrencyAmount<Token>,
    haircut: CurrencyAmount<Token>
  ) => void
] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector((state) => state.swap.swapData),
    useCallback(
      (input, potentialOutput, haircut) =>
        dispatch(updateSwapData({ input, potentialOutput, haircut })),
      [dispatch]
    ),
  ];
};

export const useSwapRate = (): number | undefined => {
  const [swapData] = useSwapData();
  return useMemo(() => {
    return swapData.input && swapData.potentialOutput
      ? Number(swapData?.potentialOutput?.quotient) /
          Number(swapData?.input?.quotient)
      : undefined;
  }, [swapData]);
};

export const useMinimumAccepted = (): CurrencyAmount<Token> | undefined => {
  const [swapData] = useSwapData();
  const [slippageTolerance] = useWithdrawSlippageTolerance();
  const scaledTolerance = 100_000 - slippageTolerance * 1_000;
  return useMemo(() => {
    return swapData.potentialOutput
      ? CurrencyAmount.fromRawAmount(
          swapData?.potentialOutput?.currency,
          swapData?.potentialOutput?.multiply(scaledTolerance).divide(100_000)
            .quotient
        )
      : undefined;
  }, [scaledTolerance, swapData]);
};
