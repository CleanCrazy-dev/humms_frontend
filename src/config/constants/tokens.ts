import { TokenInfo } from "@config/types";
import { ChainId } from "./web3";

export const TOKENS: { [symbol: string]: TokenInfo } = {
  // METIS: {
  //   name: "Metis Token",
  //   symbol: "METIS",
  //   decimals: 18,
  //   logoUrl: "/images/metis_logo.png",
  //   address: {
  //     [ChainId.STARDUST]: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
  //     [ChainId.ANDROMEDA]: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
  //   }
  // },
  DAI: {
    id: 2,
    name: "DAI Stablecoin",
    symbol: "DAI",
    decimals: 18,
    logoUrl: "/images/dai.svg",
    address: {
      [ChainId.STARDUST]: "0x4c7A71a7B2066f71db85d3Cc4eD96f55cb509F8e",
      [ChainId.ANDROMEDA]: "0x4651B38e7ec14BB3db731369BFE5B08F2466Bd0A",
    },
  },
  HLPDAI: {
    name: "Hummus DAI Stablecoin",
    symbol: "HLP-DAI",
    decimals: 18,
    logoUrl: "/images/dai.svg",
    address: {
      [ChainId.STARDUST]: "0xaFFbDb406d41b9a1AFD041FeBD412A2dd236244C",
      [ChainId.ANDROMEDA]: "0xd5A0760D55ad46B6A1C46D28725e4C117312a7aD",
    },
  },
  HLPUSDC: {
    name: "Hummus USDC Token",
    symbol: "HLP-m.USDC",
    decimals: 6,
    logoUrl: "/images/usdc.svg",
    address: {
      [ChainId.STARDUST]: "0xa6ae03Ff644156401205Afb6d241f245E3714F78",
      [ChainId.ANDROMEDA]: "0x9E3F3Be65fEc3731197AFF816489eB1Eb6E6b830",
    },
  },
  HLPUSDT: {
    name: "Hummus USDT Token",
    symbol: "HLP-m.USDT",
    decimals: 6,
    logoUrl: "/images/usdt.svg",
    address: {
      [ChainId.STARDUST]: "0xF8F6F0C986B2dE4ABf1E8AAE12ffad3A376438D2",
      [ChainId.ANDROMEDA]: "0x9F51f0D7F500343E969D28010C7Eb0Db1bCaAEf9",
    },
  },
  HUM: {
    name: "Hummus",
    symbol: "HUM",
    decimals: 18,
    logoUrl: "/images/hummus_icon.svg",
    address: {
      [ChainId.STARDUST]: "0x8b2AF921F3eaef0d9D6a47B65E1F7F83bEfB2f1f",
      [ChainId.ANDROMEDA]: "0x4aAC94985cD83be30164DfE7e9AF7C054D7d2121",
    },
  },
  USDC: {
    id: 0,
    name: "USDC Token",
    symbol: "m.USDC",
    decimals: 6,
    logoUrl: "/images/usdc.svg",
    address: {
      [ChainId.STARDUST]: "0x159B73D85b93E9F108F7FCCB77Ae1271607682db",
      [ChainId.ANDROMEDA]: "0xea32a96608495e54156ae48931a7c20f0dcc1a21",
    },
  },
  USDT: {
    id: 1,
    name: "USDT Token",
    symbol: "m.USDT",
    decimals: 6,
    logoUrl: "/images/usdt.svg",
    address: {
      [ChainId.STARDUST]: "0x24BBD559a81971A37E6fCaEfc02E8Ed54FDdd7A9",
      [ChainId.ANDROMEDA]: "0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc",
    },
  },
};

export const SUPPORTED_TOKENS: TokenInfo[] = [
  TOKENS.USDC,
  TOKENS.USDT,
  TOKENS.DAI,
];
