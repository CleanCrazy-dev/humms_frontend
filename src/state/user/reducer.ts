import { DEFAULT_SLIPPAGE_TOLERANCE, DEFAULT_TXN_DEADLINE } from "@config/constants/misc";
import { createReducer } from "@reduxjs/toolkit";
import { updateSwapSlippageTolerance, updateTxnDeadline, updateWithdrawSlippageTolerance } from "./actions";

export interface UserState {
  // allowInfiniteApproval: boolean,
  // disableInfiniteApproval: boolean,
  // allowWithdrawOtherTokens: boolean,
  txnDeadline: number, // transaction deadline in minutes
  // gasPrice: string,
  swapSlippageTolerance: number,
  withdrawSlippageTolerance: number,
}

export const initialState: UserState = {
  txnDeadline: DEFAULT_TXN_DEADLINE,
  swapSlippageTolerance: DEFAULT_SLIPPAGE_TOLERANCE,
  withdrawSlippageTolerance: DEFAULT_SLIPPAGE_TOLERANCE,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateTxnDeadline, (state, action) => {
      state.txnDeadline = action.payload.txnDeadline
    })
    .addCase(updateSwapSlippageTolerance, (state, action) => {
      state.swapSlippageTolerance = action.payload.swapSlippageTolerance
    })
    .addCase(updateWithdrawSlippageTolerance, (state, action) => {
      state.withdrawSlippageTolerance = action.payload.withdrawSlippageTolerance
    })
    // .addCase(updateGasPrice, (state, action) => {
    //   state.gasPrice = action.payload.gasPrice
    // })
)