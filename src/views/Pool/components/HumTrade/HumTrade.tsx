import { useTradeModalToggle } from "@state/application/hooks";
import Image from "next/image";

function HumTrade() {
  const [toggleTradeModal] = useTradeModalToggle();

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden px-6 py-8 grid grid-cols-1 md:grid-cols-[auto,200px] gap-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[40%,60%] gap-6 md:gap-8">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image src="/images/hummus_icon.svg" width={64} height={64} alt="hummus_icon" />
            </div>
            <h5 className="text-2xl font-semibold text-dark ml-[18px] mr-2">HUM</h5>
            <p className="text-xs text-dark/30 mr-4">$1.98</p>
            <p className="text-sm rounded bg-darkGreen/10 text-darkGreen px-1.5 py-1">+0.77%</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div>
              <p className="text-dark/30 mb-2">Circulating Supply</p>
              <p className="text-lg text-dark font-semibold">
                18,882,845.50 <span className="text-dark/30">HUM</span>
              </p>
            </div>

            <div>
              <p className="text-dark/30 mb-2">Market cap</p>
              <p className="text-lg text-dark font-semibold">$ 14,242,917,191</p>
            </div>
          </div>
        </div>
        <div className="flex md:justify-end items-end lg:items-center">
          <div>
            <button className="button" onClick={toggleTradeModal}>Trade now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HumTrade;
