import Web3 from "web3";
import Link from "next/link";
import Image from "next/image";
import logo from "@assets/hummus/full-logo.png";
import UserAccount from "@components/UserAccount";
// import { useWalletModalToggle } from "@state/application/hooks";
import { ConnectButton } from "./ConnectButton";
import { useActiveWeb3React } from "@hooks/web3";

const Header = () => {
  const { active, account } = useActiveWeb3React();

  return (
    <header className="px-5 md:px-20 bg-white">
      <div className="flex items-center relative justify-between md:justify-end py-7">
        <Link href="/">
          <a className="w-[150px] md:w-[180px] md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Image src={logo} width={1124} height={263} alt="Hummus" />
          </a>
        </Link>

        {!account && (
          <ConnectButton />
        )}
        {active && account && <UserAccount />}
      </div>
    </header>
  );
};

export default Header;
