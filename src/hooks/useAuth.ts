import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
// import { ConnectorNames, connectorLocalStorageKey, Text, Box, LinkExternal } from '@pancakeswap/uikit'
// import { connectorsByName } from 'utils/web3React'
import { addNetwork } from '@utils/addNetwork'
import {useAppDispatch} from '@state/hooks'
import useToast from '@widgets/Toast/useToast'
// import { clearUserStates } from '../utils/clearUserStates'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { chainId, activate, deactivate, setError } = useWeb3React()
  const { toastError } = useToast()

  // const login = useCallback(
  //   async (connectorID: ConnectorNames) => {
  //     const connectorOrGetConnector = connectorsByName[connectorID]
  //     const connector =
  //       typeof connectorOrGetConnector !== 'function' ? connectorsByName[connectorID] : await connectorOrGetConnector()

  //     if (typeof connector !== 'function' && connector) {
  //       activate(connector, async (error: Error) => {
  //         if (error instanceof UnsupportedChainIdError) {
  //           setError(error)
  //           const provider = await connector.getProvider()
  //           const hasSetup = await addNetwork(provider)
  //           if (hasSetup) {
  //             activate(connector)
  //           }
  //         } else {
  //           window?.localStorage?.removeItem(connectorLocalStorageKey)
  //           if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
  //             toastError(
  //               'Provider Error',
  //               // <Box>
  //               //   <Text>No provider was found'</Text>
  //               //   <LinkExternal href="https://docs.pancakeswap.finance/get-started/connection-guide">
  //               //     {t('Need help ?')}
  //               //   </LinkExternal>
  //               // </Box>,
  //             )
  //           } else if (
  //             error instanceof UserRejectedRequestErrorInjected ||
  //             error instanceof UserRejectedRequestErrorWalletConnect
  //           ) {
  //             if (connector instanceof WalletConnectConnector) {
  //               const walletConnector = connector as WalletConnectConnector
  //               walletConnector.walletConnectProvider = null
  //             }
  //             toastError('Authorization Error', 'Please authorize to access your account')
  //           } else {
  //             toastError(error.name, error.message)
  //           }
  //         }
  //       })
  //     } else {
  //       window?.localStorage?.removeItem(connectorLocalStorageKey)
  //       toastError('Unable to find connector', 'The connector config is wrong')
  //     }
  //   },
  //   [activate, toastError, setError],
  // )

  // const logout = useCallback(() => {
  //   deactivate()
  //   // clearUserStates(dispatch, chainId)
  // }, [deactivate])

  // return { login, logout }
}

export default useAuth