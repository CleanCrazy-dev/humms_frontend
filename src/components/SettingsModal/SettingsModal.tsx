import { CloseButton, Modal } from "@components/Modal";
import Radio from "@components/Radio/Radio";
import { useSettingsModalToggle } from "@state/application/hooks";
import {
  useSwapSlippageTolerance,
  useTxnDeadline,
  useWithdrawSlippageTolerance,
} from "@state/user/hooks";
import { useCallback, useState } from "react";

const inputStyle =
  "border border-dark/20 focus-within:border-dark/40 rounded-md px-3 outline-none py-1 text-right w-[62px]";

const toSlippageIndex = (slippage?: number) => {
  if (slippage === 0.5) {
    return 0;
  } else if (slippage === 1) {
    return 1;
  } else {
    return 2;
  }
};

function SettingsModal() {
  const [toggleSettingsModal, isOpen] = useSettingsModalToggle();
  const [swapSlippage, setSwapSlippage] = useSwapSlippageTolerance();
  const [withdrawSlippage, setWithdrawSlippage] =
    useWithdrawSlippageTolerance();
  const [txnDeadline, setTxnDeadline] = useTxnDeadline();

  const [selectedSwapSlippage, setSelectedSwapSlippage] = useState(
    toSlippageIndex(swapSlippage)
  );
  const [selectedWithdrawSlippage, setSelectedWithdrawSlippage] = useState(
    toSlippageIndex(withdrawSlippage)
  );

  const [swapSlippageInput, setSwapSlippageInput] = useState(
    selectedSwapSlippage === 2 ? swapSlippage.toFixed(1).toString() : "2.0"
  );
  const [withdrawSlippageInput, setWithdrawSlippageInput] = useState(
    selectedWithdrawSlippage === 2
      ? withdrawSlippage.toFixed(1).toString()
      : "2.0"
  );

  const handleSwapSlippage = useCallback(
    (id: number, slippage: number | string) => {
      setSelectedSwapSlippage(id);
      if (typeof slippage === "number") {
        setSwapSlippage(slippage);
      } else {
        setSwapSlippageInput(slippage);
        setSwapSlippage(Number(slippage));
      }
    },
    [setSwapSlippage]
  );

  const handleWithdrawSlippage = useCallback(
    (id: number, slippage: number | string) => {
      setSelectedWithdrawSlippage(id);
      if (typeof slippage === "number") {
        setWithdrawSlippage(slippage);
      } else {
        setWithdrawSlippageInput(slippage);
        setWithdrawSlippage(Number(slippage));
      }
    },
    [setWithdrawSlippage]
  );

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={toggleSettingsModal}
      width="sm:w-[430px]"
      px={5}
      py={5}
      hideCloseButton
    >
      <div className="w-full pb-3 pl-3">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-2xl font-semibold text-dark">Settings</h3>

          <CloseButton onDismiss={toggleSettingsModal} />
        </div>
        {/* Body --Start-- */}
        <div className="mt-6 space-y-7">
          {/* Slippage Tolerance --Start-- */}
          <div>
            <p className="text-dark/70 text-sm">Swap</p>
            <h6 className="text-dark/90 text-lg mt-1.5 font-semibold">
              Slippage Tolerance
            </h6>
            <div className="flex gap-8 mt-1.5">
              <Radio
                name="swap"
                label="0.5%"
                checked={selectedSwapSlippage === 0}
                onClick={() => handleSwapSlippage(0, 0.5)}
              />
              <Radio
                name="swap"
                label="1%"
                checked={selectedSwapSlippage === 1}
                onClick={() => handleSwapSlippage(1, 1)}
                defaultChecked
              />

              <div className="flex items-center gap-1.5">
                <Radio
                  name="swap"
                  checked={selectedSwapSlippage === 2}
                  onClick={() => handleSwapSlippage(2, swapSlippageInput)}
                />
                <input
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                  disabled={selectedSwapSlippage !== 2}
                  value={swapSlippageInput}
                  onChange={(e: any) =>
                    handleSwapSlippage(2, e.target.value.toString())
                  }
                  max="100"
                  min="0"
                  className={inputStyle}
                />
                <span>%</span>
              </div>
            </div>
          </div>
          {/* Slippage Tolerance --End-- */}

          {/* Withdrawal --Start-- */}
          <div>
            <p className="text-dark/70 text-sm">Withdrawal</p>
            <h6 className="text-dark/90 text-lg mt-1.5 font-semibold">
              Slippage Tolerance
            </h6>
            <div className="flex gap-8 mt-1.5">
              <Radio
                name="withdrawal"
                label="0.5%"
                checked={selectedWithdrawSlippage === 0}
                onClick={() => handleWithdrawSlippage(0, 0.5)}
              />
              <Radio
                name="withdrawal"
                label="1%"
                checked={selectedWithdrawSlippage === 1}
                onClick={() => handleWithdrawSlippage(1, 1)}
                defaultChecked
              />

              <div className="flex items-center gap-1.5">
                <Radio
                  name="withdrawal"
                  checked={selectedWithdrawSlippage === 2}
                  onClick={() =>
                    handleWithdrawSlippage(2, withdrawSlippageInput)
                  }
                />
                <input
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                  disabled={selectedWithdrawSlippage !== 2}
                  value={withdrawSlippageInput}
                  onChange={(e: any) =>
                    handleWithdrawSlippage(2, e.target.value.toString())
                  }
                  max="100"
                  min="0"
                  className={inputStyle}
                />
                <span>%</span>
              </div>
            </div>
          </div>
          {/* Withdrawal --End-- */}
          {/* Withdrawal In Other Tokens--Start-- */}
          {/* <div>
            <h6 className="text-dark/90 text-lg font-semibold">
              Withdrawal In Other Tokens
            </h6>
            <div className="flex gap-8 mt-1.5">
              <Radio
                name="withdrawal_in_other_token"
                label="On"
                defaultChecked
              />
              <Radio name="withdrawal_in_other_token" label="Off" />
            </div>
          </div> */}
          {/* Withdrawal In Other Tokens--End-- */}

          {/* Transaction Deadline --Start-- */}
          <div>
            <p className="text-dark/70 text-sm">Transaction</p>
            <h6 className="text-dark/90 text-lg mt-1.5 font-semibold">
              Transaction Deadline
            </h6>
            <div className="flex gap-8 mt-1.5">
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  pattern="^[0-9]*"
                  placeholder="0"
                  defaultValue="30"
                  value={txnDeadline}
                  onChange={(e: any) => setTxnDeadline(Number(e.target.value))}
                  className={inputStyle}
                />
                <span>minutes</span>
              </div>
            </div>
          </div>
          {/*  --End-- */}
        </div>
        {/* Body --End-- */}
      </div>
    </Modal>
  );
}

export default SettingsModal;
