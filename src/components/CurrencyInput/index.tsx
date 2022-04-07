import { Currency } from '@uniswap/sdk-core';
import React, { useRef } from 'react';
import { useActiveWeb3React } from '@hooks/web3';
import { useCurrencyBalance } from '@state/wallet/hooks';
import { escapeRegExp } from '@utils/misc';

interface CurrencyInputProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton?: boolean;
  currency?: Currency | null;
  id: string;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export function CurrencyInput({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  currency,
  id,
}: CurrencyInputProps) {
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);
  const inputRef = useRef(null as null | HTMLDivElement);

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };

  return (
    <div className="rounded-xl bg_dark_4 flex items-center font-medium justify-between gap-5 h-12">
      <div className="grow-0 ml-8" ref={inputRef}>
        <input
          className="w-full text-dark outline-none border-none bg-transparent"
          type="text"
          placeholder="0.00"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          value={value}
          onChange={(event) => {
            enforcer(event.target.value.replace(/,/g, '.'));
          }}
        />
      </div>

      {/* {currency && (
          <p className={`w-24 text-md text-pink-800 p-1 pl-2 mr-2 whitespace-nowrap`}>
            {currency.symbol}
          </p>
        )} */}
      {showMaxButton && selectedCurrencyBalance && (
        <div className="shrink-0 mr-4">
          <button 
            className="px-3 py-1 rounded-full text-darkOrange text-xs border border-darkOrange hover:bg-darkOrange/10 duration-100 text-darkOrange"
            onClick={onMax}
          >
            Max
          </button>
        </div>
      )}
    </div>
  );
}