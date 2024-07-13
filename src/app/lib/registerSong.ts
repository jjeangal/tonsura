import { PasskeyArgType } from '@safe-global/protocol-kit'
import { Safe4337Pack } from '@safe-global/relay-kit'
import { encodeFunctionData } from 'viem'
import {
    BUNDLER_URL,
    PAYMASTER_ADDRESS,
    FACTORY_ADDRESS,
    PAYMASTER_URL,
    RPC_URL
} from './constants'

const paymasterOptions = {
    isSponsored: true,
    paymasterAddress: PAYMASTER_ADDRESS,
    paymasterUrl: PAYMASTER_URL
}

/**
 * Mint an NFT.
 * @param {PasskeyArgType} signer - Signer object with rawId and coordinates.
 * @param {string} safeAddress - Safe address.
 * @returns {Promise<void>}
 * @throws {Error} If the operation fails.
 */
export const registerSong = async (passkey: PasskeyArgType, safeAddress: string) => {
    const safe4337Pack = await Safe4337Pack.init({
        provider: RPC_URL,
        signer: passkey,
        bundlerUrl: BUNDLER_URL,
        paymasterOptions,
        options: {
            owners: [
                /* Other owners... */
            ],
            threshold: 1,
        },
    })

    const mintNFTTransaction = {
        to: FACTORY_ADDRESS,
        data: CreateNewSong(safeAddress),
        value: '0',
    }

    const safeOperation = await safe4337Pack.createTransaction({
        transactions: [mintNFTTransaction],
    })

    const signedSafeOperation = await safe4337Pack.signSafeOperation(
        safeOperation
    )

    console.log('SafeOperation', signedSafeOperation)

    // 4) Execute SafeOperation
    const userOperationHash = await safe4337Pack.executeTransaction({
        executable: signedSafeOperation,
    })

    return userOperationHash
}

/**
 * Encodes the data for a safe mint operation.
 * @param to The address to mint the token to.
 * @param tokenId The ID of the token to mint.
 * @returns The encoded data for the safe mint operation.
 */
export function CreateNewSong(
    metadata: string
): string {
    return encodeFunctionData({
        abi: [
            {
                constant: false,
                inputs: [
                    {
                        internalType: "string",
                        name: 'metadata',
                        type: 'string',
                    },
                ],
                name: 'CreateNewSong',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        functionName: 'CreateNewSong',
        args: [metadata],
    })
}