import { useToken } from "@hooks/Tokens";
import { useAddress } from "@hooks/useAddress";
import { useActiveWeb3React } from "@hooks/web3";
import { useTokenBalance, useTokenBalances } from "@state/wallet/hooks";
import Image from "next/image";
import { FC, useCallback } from "react";
import { Pool } from "@config/types";
import { Token } from "@uniswap/sdk-core";
import { useFarmDepositModalToggle, useFarmWithdrawModalToggle, usePoolDepositModalToggle, usePoolWithdrawModalToggle, useWalletModalToggle } from "@state/application/hooks";
import useExchangeRate from "@hooks/calls/asset/useExchangeRate";
import useCoverageRatio from "@hooks/calls/asset/useCoverageRatio";
import { formatBigNumberToFixed } from "@utils/formatNumber";

interface PoolItemProps {
  pool: Pool;
  setToken: (token: Token) => void;
  setLpToken: (lpToken: Token) => void;
  setPid: (pid: number) => void;
}

const PoolItem: FC<PoolItemProps> = ({
  pool,
  setToken,
  setLpToken,
  setPid,
}) => {
  const {
    token,
    farm,
  } = pool;
  const { pid } = farm;
  const { symbol, logoUrl } = token

  const {account} = useActiveWeb3React()

  const [toggleWalletModal] = useWalletModalToggle()
  const [togglePoolDeposit] = usePoolDepositModalToggle()
  const [] = usePoolWithdrawModalToggle()
  const [toggleFarmDeposit] = useFarmDepositModalToggle()
  const [] = useFarmWithdrawModalToggle()

  const tokenAddress = useAddress(token.address)
  const lpAddress = useAddress(farm.token.address)
  const baseToken = useToken(tokenAddress)

  const lpToken = useToken(lpAddress)
  const balances = useTokenBalances(account, [baseToken, lpToken])
  const poolBalance = useTokenBalance(lpAddress, baseToken)
  const exchangeRate = useExchangeRate(lpAddress)
  const coverageRatio = useCoverageRatio(lpAddress)

  const handleDeposit = useCallback(() => {
    if (!!account) {
      setToken(baseToken)
      setLpToken(lpToken)
      togglePoolDeposit()
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal, togglePoolDeposit, setLpToken, setToken, baseToken, lpToken])

  const handleStake = useCallback(() => {
    setToken(baseToken)
    setLpToken(lpToken)
    setPid(pid)
    toggleFarmDeposit()
  }, [toggleFarmDeposit, setLpToken, setPid, setToken, pid, baseToken, lpToken])

  return (
    <>
      <div className="bg-white p-6 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[300px,auto,150px] gap-y-7">
          <div className="flex gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full relative">
              <Image src={logoUrl} alt={symbol} layout="fill" />
            </div>
            <div>
              <h5 className="text-lg font-semibold text-dark">{symbol}</h5>
              <p>
                <span className="text-dark/30">Coverage Ratio:</span>{" "}
                <span className="font-semibold">{formatBigNumberToFixed(coverageRatio?.mul(100), 2)}%</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4">
            <div>
              <p className="text-dark/30 text-sm mb-1">Pool Deposits</p>
              <p className="text-dark font-semibold">
                {poolBalance?.toFixed(2, { groupSeparator: ',' })} <span className="text-dark/30">{symbol}</span>
              </p>
            </div>
            <div>
              <p className="text-dark/30 text-sm mb-1">Volume 24H</p>
              <p className="text-dark font-semibold">{poolBalance?.toFixed(2, { groupSeparator: ',' })} <span className="text-dark/30">{symbol}</span></p>
            </div>
            <div>
              <p className="text-dark/30 text-sm mb-1">My Deposits</p>
              <p className="text-dark font-semibold">{balances && balances[lpAddress]?.toFixed(2, { groupSeparator: ',' })} <span className="text-dark/30">{symbol}</span></p>
            </div>
          </div>

          <div className="flex lg:justify-end">
            <div>
              <button
                className="button !px-8 !py-2.5" 
                onClick={handleDeposit}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>

        {/* Devider --Start-- */}
        <div className="h-px bg-dark/10 w-full my-6 mb-4 opacity-80"></div>
        {/* Devider --End-- */}

        <div className="grid grid-cols-1 lg:grid-cols-[300px,auto,150px] gap-y-7">
          <div className="flex items-center text-dark font-semibold">
            <p>Reward:</p>
            <div className="shrink-0 mr-3 ml-2 flex items-center">
              <Image src="/images/hummus_logo_orange.svg" width={32} height={32} alt="Hummus" />
            </div>
            <p>
              <span className="text-dark/30">HUM</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[25%,40%,35%] gap-y-4 content-center text-dark/30 text-sm font-semibold">
            <p>
              Base APR: <span className="text-dark">{}</span>
            </p>
            <p>
              Median Boosted APR: <span className="text-dark">{}</span>
            </p>
            <p>
              My Boosted APR: <span className="text-dark">{}</span>
            </p>
          </div>

          <div className="flex lg:justify-end">
            <div>
              <button 
                className="button-secondary !px-8 !py-[9px]"
                onClick={handleStake}
                // disabled={true}
              >
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PoolItem;
