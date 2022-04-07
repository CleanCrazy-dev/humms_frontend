import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import TokenSelector from "@components/TokenSelector";
import { SwapModal } from "@views/Swap/components/SwapModal";
import { useActiveWeb3React } from "@hooks/web3";
import { usePoolAddress } from "@hooks/useAddress";
import { useAllTokens, useToken } from "@hooks/Tokens";
import { useTokenBalances } from "@state/wallet/hooks";
import { tryParseAmount } from "@utils/tryParseAmount";
import "react-toastify/dist/ReactToastify.css";
import {
  useSwapModalToggle,
  useWalletModalToggle,
} from "@state/application/hooks";
import useQuotePotentialSwaps from "@hooks/calls/router/useQuotePotentialSwaps";
import {
  useSelectedToken,
  useSelectionMode,
  useSwapData,
  useToggleSelectedTokens,
} from "@state/swap/hooks";
import { SelectedTokenType } from "@state/swap/actions";

export type TokenType = {
  name: string;
  logoURI: string;
  address: string;
};

const Swap = () => {
  const { account, chainId } = useActiveWeb3React();
  const [toggleWalletModal] = useWalletModalToggle();
  const [toggleSwapModal] = useSwapModalToggle();

  const poolAddress = usePoolAddress();

  const [, updateSwapData] = useSwapData();
  const [, setSelectionMode] = useSelectionMode();
  const [fromInfo] = useSelectedToken("from");
  const [toInfo] = useSelectedToken("to");
  const toggleTokens = useToggleSelectedTokens();

  const fromToken = useToken(fromInfo?.address[chainId]);
  const toToken = useToken(toInfo?.address[chainId]);

  const [input, setInput] = useState<string>("");

  const [potentialOutput, haircut] = useQuotePotentialSwaps(
    fromToken,
    toToken,
    poolAddress,
    fromToken && input ? tryParseAmount(input, fromToken) : undefined
  );

  const enableSwap = useMemo(
    () => fromInfo && toInfo && input && potentialOutput,
    [fromInfo, toInfo, input, potentialOutput]
  );

  const allTokens = useAllTokens();
  const balances = useTokenBalances(account, Object.values(allTokens));

  const handleSelect = useCallback(
    (type: SelectedTokenType) => {
      setSelectionMode(type);
    },
    [setSelectionMode]
  );

  const handleSwap = useCallback(() => {
    updateSwapData(tryParseAmount(input, fromToken), potentialOutput, haircut);
    toggleSwapModal();
  }, [
    updateSwapData,
    input,
    fromToken,
    potentialOutput,
    haircut,
    toggleSwapModal,
  ]);

  return (
    <>
      <SwapModal />

      <main className="px-5 md:px-0">
        <div className="w-[480px] mx-auto mt-12 bg-white rounded-3xl px-4 py-5">
          <h1 className="text-2xl tect-dark font-semibold mb-5">Swap Tokens</h1>
          {/* Swap Tokens --Start-- */}
          <div className="relative grid grid-cols-1 gap-2">
            {/* Box One  --Start-- */}
            <div className="bg_dark_4 rounded-xl py-3 pb-4 px-4 space-y-5">
              <div className="text-dark/40 flex items-center font-medium justify-between gap-5 flex-wrap">
                <p>From</p>
                {!!account && (
                  <p>
                    Balance:{" "}
                    <span className="text-dark font-semibold">
                      {balances[fromToken?.address]?.toFixed(2) || "0.00"}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex items-center font-medium justify-between gap-5">
                <div className="grow-0">
                  <input
                    type="text"
                    placeholder="0.00"
                    className="text-2xl w-full font-semibold text-dark outline-none border-none bg-transparent"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>

                <div className="shrink-0">
                  <TokenSelector
                    selected={fromInfo}
                    onSelect={() => handleSelect("from")}
                  />
                </div>
              </div>
            </div>
            {/* Box One  --End-- */}

            {/* Swap Button --Start-- */}
            <button
              onClick={toggleTokens}
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 duration-150 text-dark absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 active:scale-100"
            >
              <Image
                src="/images/ArrowsDownUp.svg"
                alt="ArrowsDownUp"
                width={22}
                height={22}
              />
            </button>
            {/* Swap Button --End-- */}

            {/* Box Two --Start-- */}
            <div className="bg_dark_4 rounded-xl py-4 px-4 space-y-5">
              <div className="text-dark/40 flex items-center font-medium justify-between gap-5 flex-wrap">
                <p>To</p>
                {!!account && (
                  <p>
                    Balance:{" "}
                    <span className="text-dark font-semibold">
                      {balances[toToken?.address]?.toFixed(2) || "0.00"}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center font-medium justify-between gap-5">
                <div className="grow-0">
                  <input
                    type="text"
                    placeholder="0.00"
                    disabled
                    value={potentialOutput?.toExact()}
                    className="text-2xl w-full font-semibold text-dark outline-none border-none bg-transparent"
                  />
                </div>

                <div className="shrink-0">
                  <TokenSelector
                    selected={toInfo}
                    onSelect={() => handleSelect("to")}
                  />
                </div>
              </div>
            </div>
            {/* Box Two --End-- */}
          </div>

          <button
            className="w-full text-center mt-2 px-12 py-3 cursor-pointer block button"
            disabled={!!account && !enableSwap}
            onClick={!!account ? handleSwap : toggleWalletModal}
          >
            {!account ? (
              <>Connect wallet</>
            ) : !fromInfo || !toInfo ? (
              "Select a token"
            ) : !enableSwap ? (
              "Invalid Amounts"
            ) : (
              "Swap"
            )}
          </button>
          {/* Swap Tokens --End-- */}
        </div>
      </main>
    </>
  );
};

export default Swap;
