import { PasskeyArgType } from '@safe-global/protocol-kit'
import { Safe4337Pack } from '@safe-global/relay-kit'
import { encodeFunctionData } from 'viem'
import {
    BUNDLER_URL,
    PAYMASTER_ADDRESS,
    PAYMASTER_URL,
    RPC_URL
} from './constants'

import Tonsura from "../../generated/deployedContracts";

const paymasterOptions = {
    isSponsored: true,
    paymasterAddress: PAYMASTER_ADDRESS,
    paymasterUrl: PAYMASTER_URL
}

/**
 * Register a Song.
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
            owners: [],
            threshold: 1,
        },
    })

    const registerSongTx = {
        to: Tonsura[11155111][0].contracts.Tonsura.address,
        data: CreateNewSong(safeAddress),
        value: '0',
    }

    const safeOperation = await safe4337Pack.createTransaction({
        transactions: [registerSongTx],
    })

    const signedSafeOperation = await safe4337Pack.signSafeOperation(
        safeOperation
    )

    console.log('SafeOperation', signedSafeOperation)

    // 4) Execute SafeOperation
    const userOperationHash = await safe4337Pack.executeTransaction({
        executable: signedSafeOperation,
    })

    let userOperationReceipt = null

    while (!userOperationReceipt) {
        // Wait 2 seconds before checking the status again
        await new Promise((resolve) => setTimeout(resolve, 2000))
        userOperationReceipt = await safe4337Pack.getUserOperationReceipt(
            userOperationHash
        )
    }
    return userOperationReceipt;
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
                name: 'createNewSong',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        functionName: 'createNewSong',
        args: [metadata],
    })
}