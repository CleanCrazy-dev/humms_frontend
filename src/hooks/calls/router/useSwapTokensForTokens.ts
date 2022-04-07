import { useRouterContract } from "@hooks/contracts/useRouter";
import { BigNumberish } from "ethers";
import { useCallback } from "react";

const useSwapTokensForTokens = () => {
  const router = useRouterContract();

  const handleSwapTokensForTokens = useCallback(
    async (
      tokenPath?: string[],
      poolPath?: string[],
      fromAmount?: BigNumberish,
      minimumToAmount?: BigNumberish,
      to?: string,
      deadline?: number
    ) => {
      return router.swapTokensForTokens(
        tokenPath,
        poolPath,
        fromAmount,
        minimumToAmount,
        to,
        deadline
      );
    },
    [router]
  );

  return { onSwapTokensForTokens: handleSwapTokensForTokens };
};

export default useSwapTokensForTokens;
