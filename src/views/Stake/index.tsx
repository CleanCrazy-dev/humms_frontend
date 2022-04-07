import { useActiveWeb3React } from "@hooks/web3"
import { useWalletModalToggle } from "@state/application/hooks"
import Image from "next/image"
import StakeDepositModal from "./components/StakeDepositModal"


const Stake = () => {
  const { account } = useActiveWeb3React()
  const [toggleWalletModal] = useWalletModalToggle()

  return (
    <>
      <StakeDepositModal />
      
      <main className="px-5 md:px-0 my-12">
        <div className="md:w-[664px] mx-auto rounded-3xl overflow-hidden bg-white px-4 pt-12 pb-6">
          <div className="w-32 h-32 md:w-[160px] md:h-[160px] mx-auto relative">
            <Image src="/images/hummus_logo_orange.svg" alt="Hummus" layout="fill" />
          </div>
          <h2 className="mt-8 text-2xl text-dark text-center font-semibold">
            Stake HUM to Boost Yield
          </h2>

          <div
            className="mt-12 mb-8 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-[30%,45%,25%] gap-y-5 md:gap-y-0"
            style={{
              background: "linear-gradient(90.32deg, #43AA8B 0%, #90BE6D 100%)",
            }}
          >
            <div className="md:border-r border-white/20">
              <p className="text-white/50 text-sm mb-1">Staked HUM</p>
              <p className="text-xl font-semibold text-white">
                82,845.5 <span className="text-white/50">HUM</span>
              </p>
            </div>
            <div className="text-center md:border-r border-white/20">
              <p className="text-white/50 text-sm mb-1">veHUM Mine Rate</p>
              <p className="text-xl font-semibold text-white">
                845.5 <span className="text-white/50">veHUM / hour</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-sm mb-1">veHUM Mined</p>
              <p className="text-xl font-semibold text-white">
                45.5 <span className="text-white/50">HUM</span>
              </p>
            </div>
          </div>
          
          {!!account ? (
            <button 
              className="button w-full block"
              onClick={toggleWalletModal}
            >
              Stake
            </button>
          ) : (
            <button 
              className="button w-full block"
              onClick={toggleWalletModal}
            >
              Connect wallet
            </button>
          )}
          
        </div>
      </main>
    </>
  )
}

export default Stake