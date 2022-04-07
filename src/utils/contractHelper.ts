import ERC20Abi from '@config/abi/ERC20.json'
import HumAbi from '@config/abi/Hum.json'
import HummusRouter01Abi from '@config/abi/HummusRouter01.json'
import MasterHummusV2Abi from '@config/abi/MasterHummusV2.json'
import PoolAbi from '@config/abi/Pool.json'
import VeHumAbi from '@config/abi/VeHum.json'
import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'
import { getContract } from './getContract'

export const getERC20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(address, ERC20Abi, signer)
}

export const getHummusContract = (address: string, signer?: Signer | Provider) => {
  return getContract(address, HumAbi, signer);
}

export const getMasterHummusContract = (address: string, signer?: Signer | Provider) => {
  return getContract(address, MasterHummusV2Abi, signer)
}

export const getPoolContract = (address: string, signer?: Signer | Provider) => {
  return getContract(address, PoolAbi, signer)
}

export const getRouterContract = (address: string, signer?: Signer | Provider) => {
  return getContract(address, HummusRouter01Abi, signer)
}

export const getVeHumContract = (address: string, signer?: Signer | Provider) => {
  return getContract(address, VeHumAbi, signer)
}