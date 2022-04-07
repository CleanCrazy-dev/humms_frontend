import Image from "next/image";
import { TradeModalButton } from "./TradeModalButton";
import netswap from "@assets/hummus/netswap.png";
import tethys from "@assets/hummus/tethys.png";
import { registerToken } from "@utils/registerToken";
import { useHummusAddress } from "@hooks/useAddress";
import { Modal } from "@components/Modal";
import { FC, useMemo } from "react";
import { InjectedProps } from "@components/Modal/types";
import { useWeb3React } from "@web3-react/core";
import { connectorToWallet } from "@config";
import { useTradeModalToggle } from "@state/application/hooks";

export const TradeModal: FC<InjectedProps> = () => {
  const { connector } = useWeb3React();
  const [toggleTradeModal, isOpen] = useTradeModalToggle();

  const hummusAddress = useHummusAddress();
  const connectedWallet = useMemo(
    () => connectorToWallet(connector),
    [connector]
  );

  const registerHum = async () => {
    try {
      if (hummusAddress) {
        await registerToken(hummusAddress, "HUM", 18);
        console.log("Hummus Token successfully added to wallet!");
      }
    } catch {
      throw new Error("Something went wrong.");
    }
  };

  return (
    <Modal
      title="Trade Hummus (HUM)"
      isOpen={isOpen}
      onDismiss={toggleTradeModal}
    >
      <div className="space-y-3 w-full">
        <TradeModalButton
          name="Netswap"
          alt="netswap"
          url="https://netswap.io/#/pool"
          image={netswap}
        />

        <TradeModalButton
          name="Tethys"
          alt="tethys"
          url="https://tethys.finance/swap"
          image={tethys}
        />

        {connectedWallet.name === "MetaMask" && (
          <div className="mt-8 flex justify-between">
            <button
              className="w-full px-3 py-2 flex justify-between items-center text-center rounded-full text-darkOrange text-xs border border-darkOrange hover:bg-darkOrange/10 duration-100 text-darkOrange"
              onClick={registerHum}
            >
              <span className="ml-4">Add HUM to MetaMask</span>
              <Image
                src={connectedWallet?.iconURL || ""}
                alt={connectedWallet?.name}
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
