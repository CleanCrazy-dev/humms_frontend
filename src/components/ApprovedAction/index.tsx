import {
  ApprovalState,
  useApproveCallback,
} from "@hooks/transactionCallbacks/useApproveCallback";
import { BigintIsh, CurrencyAmount, Token } from "@uniswap/sdk-core";
import { FC, ReactNode } from "react";
import { ClipLoader } from "react-spinners";

interface ApprovedActionProps {
  token?: Token; // Token needing to be approved
  spender?: string; // address of spender
  action?: ReactNode; // name or content of the action to render after approval
  onAction?: () => void; // callback of tx action to perform
  approveContent?: ReactNode; // Content to render for button approve text
  className?: string; // button className
  spinnerColor?: string; // hex color of spinner
  rawAmount?: BigintIsh; // amount to approve, if any
}

const ApprovedAction: FC<ApprovedActionProps> = ({
  token,
  spender,
  action,
  onAction,
  approveContent,
  className,
  rawAmount = "1",
  ...props
}) => {
  const [approvalState, onApprove] = useApproveCallback(
    CurrencyAmount.fromRawAmount(token, rawAmount),
    spender
  );

  return (
    <button
      disabled={approvalState === ApprovalState.UNKNOWN}
      onClick={approvalState === ApprovalState.APPROVED ? onAction : onApprove}
      className={className || ""}
      {...props}
    >
      {approvalState === ApprovalState.NOT_APPROVED && (
        <>{approveContent ? approveContent : "Approve"}</>
      )}

      {approvalState === ApprovalState.PENDING && (
        <div className="flex justify-center items-center">
          <ClipLoader color={"#ffffff"} loading={true} size={20} />
          <span className="ml-4">Approving...</span>
        </div>
      )}

      {(approvalState === ApprovalState.APPROVED ||
        approvalState === ApprovalState.UNKNOWN) && <>{action}</>}
    </button>
  );
};

export default ApprovedAction;
