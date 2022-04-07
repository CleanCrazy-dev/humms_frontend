import { useStateContext } from "@state/state";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Modal, { Styles } from "react-modal";
import { MdContentCopy } from "react-icons/md";
import { GoLinkExternal } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getInjectedProvider } from "web3modal";
import { ActionType } from "@state/reducer";
import { getDisplayAddress } from "@utils/formatAddress";
import { getBlockExplorerAddressUrl } from "@utils/networkHelper";
import { useActiveWeb3React } from "@hooks/web3";
import { injected, walletlink } from '@connectors';
import { connectorToWallet } from "@config";
import { WalletInfo } from "@config";
import { useCurrencyBalance, useETHBalances, useTokenBalance, useTokenBalances } from "@state/wallet/hooks";
import { NativeCurrency, Token } from "@uniswap/sdk-core"
import { useAllTokens, useToken } from "@hooks/Tokens";

const btnStyles =
  "px-5 py-2 rounded-full text-darkOrange bg-darkOrange/10 font-medium text-sm hover:bg-darkOrange/25 duration-150 flex items-center justify-center gap-4 grow shrink-0";

const btnOutline =
  "px-3 py-1 rounded-full text-darkOrange text-xs border border-darkOrange hover:bg-darkOrange/10 duration-100 text-darkOrange";

export const modalStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "18px",
    boxShadow: "none",
    padding: 0,
  },
  overlay: {
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(5px)",
  },
};

function UserAccount() {
  const { account, chainId, connector, deactivate } = useActiveWeb3React()
  const balance = useETHBalances([account])

  const displayAddress = useMemo(() => getDisplayAddress(account), [account]);
  const addressUrl = useMemo(() => getBlockExplorerAddressUrl(chainId, account), [chainId, account])

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const connectedWallet = useMemo<WalletInfo>(() => connectorToWallet(connector), [connector])

  const onCopyHandler = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const disconnect = useCallback(async () => {
    if (connector !== injected && connector !== walletlink) {
      (connector as any).close();
    }
    deactivate();
    setIsOpen(false)
  }, [connector, deactivate])

  return (
    <>
      <div
        onClick={openModal}
        className="flex items-center p-1 rounded-full overflow-hidden gap-3 cursor-pointer select-none gradient_bg hover:gradient_bg_hover text-white"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden relative">
          <Image src="/images/metis_logo.png" alt="metis_logo" layout="fill" priority />
        </div>
        <p className="pr-4 hidden sm:block">
          <span className="mr-4">{balance && balance[account] && balance[account].toFixed(3) || '0'} METIS</span>
          <span>{displayAddress}</span>
        </p>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
        <div className="md:w-[550px] bg-white rounded-3xl overflow-hidden px-12 py-14 relative flex items-center flex-col">
          {/* Cross Button --Start-- */}
          <button
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-lg hover:bg_dark_4 duration-150 text-dark"
            onClick={closeModal}
          >
            <MdClose size={25} />
          </button>
          {/* Cross Button --End-- */}

          {/* Network Name Box --Start-- */}
          <div className="flex items-center p-1 gap-2 select-none">
            <div className="w-7 h-7 rounded-full overflow-hidden relative">
              <Image src="/images/metis_logo.png" alt="metis_logo" layout="fill" priority />
            </div>
            <p className="text-base font-medium text-dark">Metis Network</p>
          </div>
          {/* Network Name Box --End-- */}

          {/* Address Box --Start-- */}
          <div className="mt-3">
            <h3 className="text-center text-dark font-bold text-2xl">{displayAddress}</h3>
          </div>
          {/* Address Box --End-- */}

          {/* Copy address And Snowtrace buttons --Start-- */}
          <div className="flex items-center gap-3.5 w-full mt-6">
            <CopyToClipboard text={account || "Not available, Try again!"} onCopy={onCopyHandler}>
              <button className={`${btnStyles} relative`}>
                {isCopied && (
                  <span className="absolute top-1/2 left-[45%] -translate-x-1/2  -translate-y-1/2">
                    Copied
                  </span>
                )}
                <span className={`${isCopied ? "opacity-0 pointer-events-none" : ""}`}>
                  Copy Address
                </span>
                {isCopied ? <GiCheckMark size={16} /> : <MdContentCopy size={18} />}
              </button>
            </CopyToClipboard>
            <a
              href={addressUrl}
              target="_blank"
              rel="noreferrer"
              className={btnStyles}
            >
              View on Explorer
              <GoLinkExternal size={18} />
            </a>
          </div>
          {/* Copy address And Snowtrace buttons --End-- */}

          {/* Connected Wallet --Start-- */}
          <div className="flex items-center justify-between gap-5 flex-wrap w-full mt-8">
            <div className="flex items-center text-dark text-sm font-medium gap-3">
              <p className="font-semibold">Connected with</p>
              <div className="flex items-center gap-2">
                <Image
                  src={connectedWallet?.iconURL || ""}
                  alt={connectedWallet?.name}
                  width={20}
                  height={20}
                />
                {connectedWallet?.name}
              </div>
            </div>
            <button className={btnOutline} onClick={disconnect}>
              Disconnect
            </button>
          </div>
          {/* Connected Wallet --End-- */}

        </div>
      </Modal>
    </>
  );
}

export default UserAccount;
