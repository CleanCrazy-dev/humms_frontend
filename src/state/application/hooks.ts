import { useCallback } from "react";
import { AlertProps } from "@components/Alert";
import { useActiveWeb3React } from "@hooks/web3";
import { AppState } from "..";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addAlert,
  ApplicationModal,
  removeAlert,
  setOpenModal,
} from "./reducer";

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useAppSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}

export function useAddAlertCallback() {
  const dispatch = useAppDispatch();

  return useCallback(
    (key: string | null, props: AlertProps, removeAfterMs?: number) => {
      dispatch(addAlert({ key, props, removeAfterMs }));
    },
    [dispatch]
  );
}

export function useAlerts() {
  return useAppSelector((state) => state.application.alertList);
}

export function useRemoveAlertCallback() {
  const dispatch = useAppDispatch();
  return useCallback((key: string) => {
    dispatch(removeAlert({ key }));
  }, []);
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector(
    (state: AppState) => state.application.openModal
  );
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open]
  );
}

export function useWalletModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.WALLET),
    useModalOpen(ApplicationModal.WALLET),
  ];
}

export function useSettingsModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.SETTINGS),
    useModalOpen(ApplicationModal.SETTINGS),
  ];
}

export function useTokenModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.TOKEN),
    useModalOpen(ApplicationModal.TOKEN),
  ];
}

export function useSwapModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.SWAP),
    useModalOpen(ApplicationModal.SWAP),
  ];
}

export function useTradeModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.TRADE),
    useModalOpen(ApplicationModal.TRADE),
  ];
}

export function usePoolDepositModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.POOL_DEPOSIT),
    useModalOpen(ApplicationModal.POOL_DEPOSIT),
  ];
}

export function usePoolWithdrawModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.POOL_WITHDRAW),
    useModalOpen(ApplicationModal.POOL_WITHDRAW),
  ];
}

export function useFarmDepositModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.FARM_DEPOSIT),
    useModalOpen(ApplicationModal.FARM_DEPOSIT),
  ];
}

export function useFarmWithdrawModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.FARM_WITHDRAW),
    useModalOpen(ApplicationModal.FARM_WITHDRAW),
  ];
}

export function useStakeDepositModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.STAKE_DEPOSIT),
    useModalOpen(ApplicationModal.STAKE_DEPOSIT),
  ];
}

export function useStakeWithdrawModalToggle(): [() => void, boolean] {
  return [
    useToggleModal(ApplicationModal.STAKE_WITHDRAW),
    useModalOpen(ApplicationModal.STAKE_WITHDRAW),
  ];
}
