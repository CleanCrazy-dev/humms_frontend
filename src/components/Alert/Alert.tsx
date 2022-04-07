import { useActiveWeb3React } from "@hooks/web3";
import { useRemoveAlertCallback } from "@state/application/hooks";
import { FC, useCallback, useEffect } from "react"
import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md'

const getBackgroundColor: Record<AlertSeverity, string> = {
  error: 'bg-red-500',
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-400'
}

const getIcon: Record<AlertSeverity, React.ReactNode> = {
  error: (
    <MdError />
  ),
  info: (
    <MdInfo />
  ),
  success: (
    <MdCheckCircle />
  ),
  warning: (
    <MdWarning />
  ),
}

type AlertSeverity = 'error' | 'success' | 'info' | 'warning';

export interface AlertProps {
  severity: AlertSeverity;
  title: string;
  content: React.ReactNode;
  hash?: string;
}

export default function Alert({
  severity,
  title,
  content,
  alertKey,
  removeAfterMs,
  show,
  hash,
}: AlertProps & { show: boolean; alertKey: string; removeAfterMs: number | null }) {
  const { chainId } = useActiveWeb3React();

  const removeAlert = useRemoveAlertCallback();
  const removeThisAlert = useCallback(() => removeAlert(alertKey), [alertKey, removeAlert]);

  useEffect(() => {
    if (removeAfterMs === null) return undefined;
    const timeout = setTimeout(() => {
      removeThisAlert();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeThisAlert, removeAfterMs]);

  const color = getBackgroundColor[severity]
  const icon = getIcon[severity]

  if (!show) {
    return null;
  }
  
  return (
    <div></div>
  )
}