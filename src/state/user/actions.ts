import { createAction } from "@reduxjs/toolkit";

export const updateTxnDeadline = createAction<{ txnDeadline: number }>(
  "user/updateTxnDeadline"
);
export const updateSwapSlippageTolerance = createAction<{
  swapSlippageTolerance: number;
}>("user/updateSwapSlippageTolerance");
export const updateWithdrawSlippageTolerance = createAction<{
  withdrawSlippageTolerance: number;
}>("user/updateWithdrawSlippageTolerance");
