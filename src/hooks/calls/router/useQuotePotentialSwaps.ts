import { useRouterContract } from "@hooks/contracts/useRouter";
import { useSingleCallResult } from "@state/multicall/hooks";
import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { BigNumber, BigNumberish } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useMemo } from "react";

// quote the swap rate between 'from' and 'to' tokens using a given pool
// returns quote for given amount, if no amount given, return the rate of 1 token
const useQuotePotentialSwaps = (
  from?: Token,
  to?: Token,
  pool?: string,
  fromAmount?: CurrencyAmount<Token>
): [CurrencyAmount<Token> | undefined, CurrencyAmount<Token> | undefined] => {
  const router = useRouterContract();

  const inputs = useMemo(
    () => [
      [from?.address, to?.address],
      [pool],
      fromAmount?.quotient.toString(),
    ],
    [from, to, pool, fromAmount]
  );
  const result = useSingleCallResult(
    router,
    "quotePotentialSwaps",
    inputs
  )?.result;

  const potentialOutcome: BigNumber = result?.[0];
  const haircut: BigNumber = result?.[1];

  return useMemo(
    () => [
      to && potentialOutcome
        ? CurrencyAmount.fromRawAmount(to, potentialOutcome.toString())
        : undefined,
      from && haircut
        ? CurrencyAmount.fromRawAmount(from, haircut.toString())
        : undefined,
    ],
    [to, from, potentialOutcome, haircut]
  );
};

export default useQuotePotentialSwaps;
