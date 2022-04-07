import Image from "next/image";
import { HiChevronDown } from "react-icons/hi";
import { useTokenModalToggle } from "@state/application/hooks";
import { TokenInfo } from "@config/types";
import { useCallback } from "react";

type TokenSelectorProps = {
  selected?: TokenInfo;
  onSelect?: () => void;
};

function TokenSelector({ selected, onSelect }: TokenSelectorProps) {
  const [toggleTokenModal] = useTokenModalToggle();

  const handleClick = useCallback(() => {
    onSelect();
    toggleTokenModal();
  }, [onSelect, toggleTokenModal]);

  return (
    <div className="select-none cursor-pointer" onClick={handleClick}>
      {selected ? (
        <div className="p-2 flex items-center gap-3 rounded-full text-dark bg-dark/10 hover:bg-dark/20">
          <Image
            src={selected?.logoUrl}
            alt={selected?.symbol}
            width={35}
            height={35}
          />
          <p>{selected?.symbol}</p>
          <HiChevronDown size={20} />
        </div>
      ) : (
        <div className="pr-2 pl-4 py-3 flex items-center gap-2 rounded-full text-white bg-darkOrange">
          <p>Select a token</p>
          <HiChevronDown size={20} />
        </div>
      )}
    </div>
  );
}

export default TokenSelector;
