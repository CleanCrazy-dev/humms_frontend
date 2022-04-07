import { CloseButton, Modal } from "@components/Modal";
import { SUPPORTED_TOKENS } from "@config";
import { TokenInfo } from "@config/types";
import { useAllTokens } from "@hooks/Tokens";
import { useActiveWeb3React } from "@hooks/web3";
import { useTokenModalToggle } from "@state/application/hooks";
import { useSelectedToken, useSelectionMode } from "@state/swap/hooks";
import {
  useTokenBalances,
  useTokenBalancesWithLoadingIndicator,
} from "@state/wallet/hooks";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ClipLoader } from "react-spinners";

const TokenModal = () => {
  const { account, chainId } = useActiveWeb3React();
  const [toggleTokenModal, isOpen] = useTokenModalToggle();
  const [selectionMode] = useSelectionMode();
  const [selectedToken, setSelectedToken] = useSelectedToken(selectionMode);
  const tokens = useAllTokens();
  const [tokenBalances, loading] = useTokenBalancesWithLoadingIndicator(
    account,
    Object.values(tokens)
  );

  const handleSelect = useCallback(
    (token: TokenInfo) => {
      setSelectedToken(token);
      toggleTokenModal();
    },
    [setSelectedToken, toggleTokenModal]
  );

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={toggleTokenModal}
      width="w-[500px]"
      px={0}
      py={6}
      hideCloseButton
    >
      <div className="pt-6 flex items-center justify-between w-full px-8">
        <h2 className="text-dark text-xl md:text-2xl font-bold">
          Select a token
        </h2>
        <CloseButton onDismiss={toggleTokenModal} />
      </div>

      <div className="w-full mt-7 mb-6">
        {SUPPORTED_TOKENS.map((token: TokenInfo, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between font-semibold w-full hover:bg_dark_4 duration-150 cursor-pointer select-none py-3.5 px-8"
            onClick={() => handleSelect(token)}
          >
            <div className="flex items-center gap-3 text-lg text-dark">
              <Image
                src={token.logoUrl}
                alt={token.symbol}
                width={35}
                height={35}
              />
              <p>{token.symbol}</p>
            </div>
            {!!account && (
              <>
                {loading ? (
                  <ClipLoader color={"#f3722c"} loading={true} size={20} />
                ) : (
                  <p className="text-lg">
                    {tokenBalances[token?.address[chainId]]?.toFixed(2) ||
                      "0.00"}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TokenModal;
