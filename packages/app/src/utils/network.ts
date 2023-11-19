import { goerli } from '@wagmi/core/chains'

export const ETH_CHAINS = [goerli]

export function GetNetworkColor(chain?: string) {
  if (chain === 'goerli') return 'brown'

  return 'grey'
}
