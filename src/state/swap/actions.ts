import { TokenInfo } from "@config/types";
import { createAction } from "@reduxjs/toolkit";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
// import { Token } from "@uniswap/sdk-core";

export type SelectedTokenType = "from" | "to";

export interface SwapData {
  input?: CurrencyAmount<Token>;
  potentialOutput?: CurrencyAmount<Token>;
  haircut?: CurrencyAmount<Token>;
}

export const updateSelectedToken = createAction<{
  type: SelectedTokenType;
  token: TokenInfo;
}>("swap/updateSelectedToken");

export const updateSelectionMode = createAction<{ type: SelectedTokenType }>(
  "swap/updateSelectionMode"
);

export const toggleSelectedTokens = createAction("swap/toggleSelectedTokens");

export const updateSwapData = createAction<{
  input: CurrencyAmount<Token>;
  potentialOutput: CurrencyAmount<Token>;
  haircut: CurrencyAmount<Token>;
}>("swap/updateSwapData");
