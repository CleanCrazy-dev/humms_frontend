import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import React, { FC } from "react";
import { injected, walletlink } from "@connectors";
import { SUPPORTED_WALLETS } from "@config/constants/wallet";
import {
  useAddAlertCallback,
  useRemoveAlertCallback,
  useWalletModalToggle,
} from "@state/application/hooks";
import { isMobile } from "@utils/userAgent";
import Option from "./Option";
import { InjectedModalProps, Modal } from "@components/Modal";

const WalletModal: FC<InjectedModalProps> = () => {
  const { connector, activate } = useWeb3React();
  const [toggleWalletModal, isOpen] = useWalletModalToggle();

  const addAlert = useAddAlertCallback();
  const removeAlert = useRemoveAlertCallback();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = "";
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount();
          toggleWalletModal();
        })
        .catch((error) => {
          console.log(error);
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
            removeAlert("connecting-wallet");
            toggleWalletModal();

            // a little janky...can't use setError because the connector isn't set
          } else {
            addAlert(
              "connecting-wallet",
              {
                title: "Connecting wallet",
                content: "Error connecting wallet",
                severity: "error",
              },
              5000
            );
          }
        });
  };

  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;

    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      // MOBILE
      if (isMobile) {
        //disable portis on mobile for now

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              label={option.name}
              icon={option.iconURL}
              id={`connect-${key}`}
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector);
              }}
              active={option.connector && option.connector === connector}
              key={key}
            />
          );
        }
        return null;
      }
      // END MOBILE

      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <Option
                key={key}
                label={option.name}
                icon={option.iconURL}
                id={`connect-${key}`}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClick={() => {
              option.connector === connector
                ? toggleWalletModal()
                : !option.href && tryActivation(option.connector);
            }}
            label={option.name}
            icon={option.iconURL}
            id={`connect-${key}`}
            key={key}
            active={option.connector && option.connector === connector}
          />
        )
      );
    });
  }

  return (
    <Modal title="Connect Wallet" isOpen={isOpen} onDismiss={toggleWalletModal}>
      <div className="space-y-3 w-full mt-8">{getOptions()}</div>
    </Modal>
  );
};

export default WalletModal;
