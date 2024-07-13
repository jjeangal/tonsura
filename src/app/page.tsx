'use client'

import { PasskeyArgType } from '@safe-global/protocol-kit'
import { Safe4337Pack } from '@safe-global/relay-kit'
import { useState } from 'react'
import PasskeyList from './components/PasskeyList'
import { BUNDLER_URL, CHAIN_NAME, RPC_URL } from './lib/constants'
import { mintNFT } from './lib/mintNFT'
import { getPasskeyFromRawId } from './lib/passkeys'
import { Box, Button, Flex, Heading, Link, Text, Image } from '@chakra-ui/react'

function Create4337SafeAccount() {
  const [selectedPasskey, setSelectedPasskey] = useState<PasskeyArgType>()
  const [safeAddress, setSafeAddress] = useState<string>()
  const [isSafeDeployed, setIsSafeDeployed] = useState<boolean>()
  const [userOp, setUserOp] = useState<string>()

  const selectPasskeySigner = async (rawId: string) => {
    console.log('selected passkey signer: ', rawId)

    const passkey = getPasskeyFromRawId(rawId)

    const safe4337Pack = await Safe4337Pack.init({
      provider: RPC_URL,
      signer: passkey,
      bundlerUrl: BUNDLER_URL,
      options: {
        owners: [],
        threshold: 1
      }
    })

    const safeAddress = await safe4337Pack.protocolKit.getAddress()
    const isSafeDeployed = await safe4337Pack.protocolKit.isSafeDeployed()

    setSelectedPasskey(passkey)
    setSafeAddress(safeAddress)
    setIsSafeDeployed(isSafeDeployed)
  }

  return (
    <Flex direction="column" align="center" width="100%">
      <Box width="50%">
        {selectedPasskey && (
          <>
            <Heading as="h2" size="md" mb={2}>Selected passkey</Heading>
            <Text overflow="hidden" textOverflow="ellipsis">
              {selectedPasskey.rawId}
            </Text>
          </>
        )}
        <PasskeyList selectPasskeySigner={selectPasskeySigner} />
      </Box>
      {safeAddress && (
        <Box width="50%" mt={4}>
          <Heading as="h2" size="md" mb={2}>Safe Account</Heading>
          <Text overflow="hidden" textOverflow="ellipsis">
            Address: {safeAddress}
          </Text>
          <Text>
            Is the account deployed?:{' '}
            {isSafeDeployed ? (
              <Link
                href={`https://app.safe.global/transactions/history?safe=sep:${safeAddress}`}
                target='_blank'
                rel='noreferrer'
                display="flex"
                alignItems="center"
              >
                Yes{' '}
                <Image
                  src='/external-link.svg'
                  alt='External link'
                  width={14}
                  height={14}
                  ml="0.5rem"
                />
              </Link>
            ) : (
              'No'
            )}
          </Text>
          {selectedPasskey && (
            <Button
              mt={4}
              onClick={async () =>
                await mintNFT({
                  signer: selectedPasskey,
                  safeAddress
                }).then(userOpHash => {
                  setUserOp(userOpHash)
                  setIsSafeDeployed(true)
                })
              }
            >
              Mint an NFT
            </Button>
          )}
          {userOp && isSafeDeployed && (
            <Text mt={4}>
              Done! Check the transaction status on{' '}
              <Link
                href={`https://jiffyscan.xyz/userOpHash/${userOp}?network=${CHAIN_NAME}`}
                target='_blank'
                rel='noreferrer'
                display="flex"
                alignItems="center"
              >
                Jiffy Scan{' '}
                <Image
                  src='/external-link.svg'
                  alt='External link'
                  width={14}
                  height={14}
                  ml="0.5rem"
                />
              </Link>
            </Text>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default Create4337SafeAccount
