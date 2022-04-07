import { Address } from "@config/types"
import { ChainId } from "./web3"

export const CONTRACTS: { [contract: string]: Address } = {
  balance: {
    [ChainId.STARDUST]: "0xf373F24433ef12fBd3349d1F3Da3da876080f070",
    [ChainId.ANDROMEDA]: "0x621EbAea3d2D3F7dDfa09C8e2C08f185fC9894D6",
  },
  masterHummus: {
    [ChainId.STARDUST]: "0x838b73a945cF42e07f316a9d0a5715e8B5B973c9",
    [ChainId.ANDROMEDA]: "0x9cadd693cDb2B118F00252Bb3be4C6Df6A74d42C",
  },
  multicall: {
    [ChainId.STARDUST]: "0xd5A67E95f21155f147be33562158a453Aa423840",
    [ChainId.ANDROMEDA]: "0x22E2872Dc625CeE3b7408ba1Be4b36a073bcA603",
  },
  pool: {
    [ChainId.STARDUST]: "0x4114458c9b16850309143cF2688D3a6185e975C3",
    [ChainId.ANDROMEDA]: "0x7AA7E41871B06f15Bccd212098DeE98d944786ab",
  },
  router: {
    [ChainId.STARDUST]: "0x56990c5c86fe2afFdd9c7d28b9f85ef1C7a691Fe",
    [ChainId.ANDROMEDA]: "0x6B6F7437DF9cE9552ED7Fc8f529BAf48fb305534",
  },
  veHum: {
    [ChainId.STARDUST]: "0xd5A0760D55ad46B6A1C46D28725e4C117312a7aD",
    [ChainId.ANDROMEDA]: "0x89351BEAA4AbbA563710864051a8C253E7b3E16d",
  },
}