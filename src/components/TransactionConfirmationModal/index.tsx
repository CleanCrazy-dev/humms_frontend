import { ChainId } from "@config";
import { useActiveWeb3React } from "@hooks/web3";
import { Currency, Token } from "@uniswap/sdk-core";
import { getBlockExplorerTxUrl } from "@utils/networkHelper";
import { useCallback } from "react";
import { ClipLoader } from "react-spinners";
import { InjectedModalProps, Modal } from "@components/Modal";

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  return (
    <>
      <div className="items-center p-1 gap-2 select-none text-center">
        <ClipLoader color="#0D0D0D" loading={true} size={35} />
        <p className="text-base font-semibold !text-dark">
          Waiting For Confirmation...
        </p>
        <p className="text-base font-semibold !text-lightOrange">
          Please confirm this transaction in your wallet
        </p>
        {/* {pendingText && (
        <div className="text-dark items-center font-medium text-center">
          <p>{pendingText}</p>
        </div>
      )} */}
      </div>
      {pendingText && (
        <div className="space-y-3 w-full">
          <div className="text-dark items-center font-medium text-center">
            <p>{pendingText}</p>
          </div>
        </div>
      )}
    </>
  );
}

export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void;
  hash: string | undefined;
  chainId: ChainId;
  currencyToAdd?: Currency | undefined;
}) {
  const { library } = useActiveWeb3React();

  // const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  const onClickTransaction = () => {
    if (hash !== "") {
      window.open(getBlockExplorerTxUrl(chainId, hash), "_blank");
    }
  };

  return (
    <div className="w-full text-center items-center justify-center">
      <p className="font-semibold">Transaction Submitted</p>
      <div className="mt-8">
        <button
          className="w-full px-3 py-2 items-center text-center rounded-full text-darkOrange text-xs border border-darkOrange hover:bg-darkOrange/10 duration-100 text-darkOrange"
          onClick={onClickTransaction}
        >
          View On Block Explorer
        </button>
      </div>

      {/* Add Token to Metamask */}

      <a
        className="w-full text-center py-2 font-medium cursor-pointer rounded-md hover:bg-darkBlue/5 duration-100 text-dark/40 select-none block !bg-darkOrange !text-white mt-4"
        onClick={onDismiss}
      >
        Done
      </a>
    </div>
    // <Wrapper>
    //   <Section>
    //     <ConfirmedIcon>
    //       <ArrowUpIcon strokeWidth={0.5} width="90px" color="primary" />
    //     </ConfirmedIcon>
    //     <AutoColumn gap="12px" justify="center">
    //       <Text fontSize="20px">{t('Transaction Submitted')}</Text>
    //       {chainId && hash && (
    //         <Link external small href={getBscScanLink(hash, 'transaction', chainId)}>
    //           {t('View on BscScan')}
    //         </Link>
    //       )}
    //       {currencyToAdd && library?.provider?.isMetaMask && (
    //         <Button
    //           variant="tertiary"
    //           mt="12px"
    //           width="fit-content"
    //           onClick={() =>
    //             registerToken(
    //               token.address,
    //               token.symbol,
    //               token.decimals,
    //               token instanceof WrappedTokenInfo ? token.logoURI : undefined,
    //             )
    //           }
    //         >
    //           <RowFixed>
    //             {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })}
    //             <MetamaskIcon width="16px" ml="6px" />
    //           </RowFixed>
    //         </Button>
    //       )}
    //       <Button onClick={onDismiss} mt="20px">
    //         {t('Close')}
    //       </Button>
    //     </AutoColumn>
    //   </Section>
    // </Wrapper>
  );
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode;
  bottomContent: () => React.ReactNode;
}) {
  return (
    <>
      <div className="pt-4">{topContent()}</div>
      <div className="pt-4">{bottomContent()}</div>
    </>
  );
}

export function TransactionErrorContent({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  // const { t } = useTranslation()
  return (
    <div></div>
    // <Wrapper>
    //   <AutoColumn justify="center">
    //     <ErrorIcon color="failure" width="64px" />
    //     <Text color="failure" style={{ textAlign: 'center', width: '85%', wordBreak: 'break-word' }}>
    //       {message}
    //     </Text>
    //   </AutoColumn>

    //   <Flex justifyContent="center" pt="24px">
    //     <Button onClick={onDismiss}>{t('Dismiss')}</Button>
    //   </Flex>
    // </Wrapper>
  );
}

interface ConfirmationModalProps {
  title: string;
  customOnDismiss?: () => void;
  hash: string | undefined;
  content: () => React.ReactNode;
  attemptingTxn: boolean;
  pendingText: string;
  currencyToAdd?: Currency | undefined;
}

const TransactionConfirmationModal: React.FC<
  InjectedModalProps & ConfirmationModalProps
> = ({
  title,
  isOpen,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React();

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss();
    }
    onDismiss?.();
  }, [customOnDismiss, onDismiss]);

  if (!chainId) return null;

  return (
    <Modal title={title} isOpen={isOpen} onDismiss={handleDismiss}>
      <div className="pt-8 space-y-3 w-full">
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : hash ? (
          <TransactionSubmittedContent
            chainId={chainId}
            hash={hash}
            onDismiss={handleDismiss}
            currencyToAdd={currencyToAdd}
          />
        ) : (
          content()
        )}
      </div>
    </Modal>
  );
};

export default TransactionConfirmationModal;
