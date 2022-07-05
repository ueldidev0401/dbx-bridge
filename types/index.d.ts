import { AbstractProvider } from 'web3-core'
import Web3 from '~/node_modules/web3/types'
declare global {
  interface Window {
    web3?: Web3
    ethereum?: AbstractProvider
  }
}
