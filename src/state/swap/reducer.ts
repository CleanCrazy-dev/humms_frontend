import { SUPPORTED_TOKENS } from "@config";
import { TokenInfo } from "@config/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  SelectedTokenType,
  SwapData,
  toggleSelectedTokens,
  updateSelectedToken,
  updateSelectionMode,
  updateSwapData,
} from "./actions";

export interface SwapState {
  selectionMode: SelectedTokenType;
  fromToken: TokenInfo;
  toToken: TokenInfo;
  swapData: SwapData;
}

export const initialState: SwapState = {
  selectionMode: undefined,
  fromToken: SUPPORTED_TOKENS[0],
  toToken: undefined,
  swapData: {},
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateSelectedToken, (state, action) => {
      if (action.payload.type === "from") {
        // if payload is already selected in "to", swap them
        if (action.payload?.token?.symbol === state.toToken?.symbol) {
          state.toToken = state.fromToken;
        }
        state.fromToken = action.payload.token;
      } else {
        // if payload is already selected in "from", swap them
        if (action.payload?.token?.symbol === state.fromToken?.symbol) {
          state.fromToken = state.toToken;
        }
        state.toToken = action.payload.token;
      }
    })
    .addCase(updateSelectionMode, (state, action) => {
      state.selectionMode = action.payload.type;
    })
    .addCase(toggleSelectedTokens, (state) => {
      const temp = state.fromToken;
      state.fromToken = state.toToken;
      state.toToken = temp;
    })
    .addCase(updateSwapData, (state, action) => {
      const { input, potentialOutput, haircut } = action.payload;

      state.swapData = {
        input,
        potentialOutput,
        haircut,
      };
    })
);
