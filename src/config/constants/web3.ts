export const UNITS: { [decimals: number]: string } = {
  0: 'wei',
  3: 'kwei',
  6: 'mwei',
  9: 'gwei',
  12: 'szabo',
  15: 'finney',
  18: 'ether',
}

export enum ChainId {
  STARDUST = 588,
  ANDROMEDA = 1088,
}

export enum SupportedChainId {
  STARDUST = 588,
  ANDROMEDA = 1088,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.STARDUST,
  SupportedChainId.ANDROMEDA,
];
