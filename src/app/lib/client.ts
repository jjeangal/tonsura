import { createPublicClient, http } from 'viem'

import { sepolia } from 'wagmi/chains'

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
})