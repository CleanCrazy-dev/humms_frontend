export interface Address {
  readonly 1?: string; // mainnet
  readonly 4?: string; // rinkeby
  readonly 42?: string; // kovan
  readonly 588?: string; // stardust
  readonly 1088?: string; // andromeda (metis)
}

export interface TokenInfo {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logoUrl?: string;
  readonly address?: Address;
  readonly id?: number;
}

export interface NativeCurrency {
  readonly symbol: string;
  readonly name: string;
  readonly decimals: number;
}

export interface Network {
  readonly chainId: number;
  readonly chainName: string;
  readonly nativeCurrency: NativeCurrency;
  readonly rpcUrls: string[];
  readonly blockExplorerUrls: string[];
}

export interface Farm {
  readonly pid: number;
  readonly token: TokenInfo;
}

export interface Pool {
  readonly pool: Address;
  readonly token: TokenInfo;
  readonly farm: Farm;
}
