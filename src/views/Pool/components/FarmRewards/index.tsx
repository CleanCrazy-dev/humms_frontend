import { ALL_POOL_IDS } from "@config/constants/pools";
import { useActiveWeb3React } from "@hooks/web3";
import { usePendingTokens } from "@views/Pool/hooks/usePendingTokens";
import Image from "next/image";

export default function FarmRewards() {
  const { account } = useActiveWeb3React();
  const pendingTokens = usePendingTokens(ALL_POOL_IDS, account);

  return (
    <div
      style={{
        background: "linear-gradient(90.32deg, #43AA8B 0%, #90BE6D 100%)",
      }}
      className="rounded-2xl flex flex-wrap gap-y-5 gap-x-3 items-center justify-between px-8 py-[15px] mt-6"
    >
      <div className="text-white flex items-center">
        <p>Pools earning: </p>
        <div className="shrink-0 mr-3 ml-4 flex items-center">
          <Image
            src="/images/hummus_icon_white.svg"
            alt="Hummus"
            width={32}
            height={32}
          />
        </div>
        <p className="font-semibold">
          {pendingTokens?.toFixed(2)} <span className="text-white/50">HUM</span>
        </p>
      </div>

      <div>
        {!!account && (
          <button className="button-default !px-8 !py-2">Claim reward</button>
        )}
      </div>
    </div>
  );
}
