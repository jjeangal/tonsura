import { PasskeyArgType } from '@safe-global/protocol-kit'
import { Safe4337Pack } from '@safe-global/relay-kit'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Heading, HStack, Link, Stack, Text, Tooltip, VStack, Image } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { BUNDLER_URL, CHAIN_NAME, RPC_URL } from '../lib/constants'
import { mintNFT } from '../lib/mintNFT'
import SafeLogo from '../../../public/safe-logo.png'

type Props = {
    passkey: PasskeyArgType
}

function SafeAccountDetails({ passkey }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [safeAddress, setSafeAddress] = useState<string>()
    const [isSafeDeployed, setIsSafeDeployed] = useState<boolean>()
    const [userOp, setUserOp] = useState<string>()

    const showSafeInfo = useCallback(async () => {
        setIsLoading(true)

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

        setSafeAddress(safeAddress)
        setIsSafeDeployed(isSafeDeployed)
        setIsLoading(false)
    }, [passkey])

    useEffect(() => {
        showSafeInfo()
    }, [showSafeInfo])

    async function handleMintNFT() {
        setIsLoading(true)

        const userOp = await mintNFT(passkey, safeAddress!)

        setIsLoading(false)
        setIsSafeDeployed(true)
        setUserOp(userOp)
    }

    const safeLink = `https://app.safe.global/home?safe=sep:${safeAddress}`
    const jiffscanLink = `https://jiffyscan.xyz/userOpHash/${userOp}?network=${CHAIN_NAME}`

    return (
        <Box margin="32px auto 0" minWidth="320px" boxShadow="md" borderRadius="md" bg="background.paper" p={4}>
            <Stack alignItems="center">
                <Heading textAlign="center" size="lg" color="primary.main">
                    Your Safe Account
                </Heading>

                {isLoading || !safeAddress ? (
                    <CircularProgress margin="24px 0" />
                ) : (
                    <>
                        <Text textAlign="center" color="primary.main">
                            <Link href={safeLink} isExternal>
                                <Tooltip label={safeAddress}>
                                    <HStack padding={4} alignItems="center">
                                        <Image
                                            boxSize={8}
                                            src={SafeLogo.src}
                                            alt="safe account logo"
                                        />
                                        <Text margin="0 8px">{splitAddress(safeAddress)}</Text>
                                        <ExternalLinkIcon />
                                    </HStack>
                                </Tooltip>
                            </Link>
                        </Text>

                        {!isSafeDeployed && <PendingDeploymentLabel />}

                        <Button
                            onClick={handleMintNFT}
                            leftIcon={<ExternalLinkIcon />}
                            variant="outline"
                            margin="24px"
                        >
                            Mint NFT
                        </Button>

                        {userOp && (
                            <Text textAlign="center" color="primary.main">
                                <Link href={jiffscanLink} isExternal>
                                    <HStack padding={4} alignItems="center">
                                        <Text>{userOp}</Text>
                                        <ExternalLinkIcon />
                                    </HStack>
                                </Link>
                            </Text>
                        )}
                    </>
                )}
            </Stack>
        </Box>
    )
}

export default SafeAccountDetails

const DEFAULT_CHAR_DISPLAYED = 6

function splitAddress(
    address: string,
    charDisplayed: number = DEFAULT_CHAR_DISPLAYED
): string {
    const firstPart = address.slice(0, charDisplayed)
    const lastPart = address.slice(address.length - charDisplayed)

    return `${firstPart}...${lastPart}`
}

function PendingDeploymentLabel() {
    return (
        <Box margin="12px auto">
            <Box
                marginRight="8px"
                borderRadius="4px"
                padding="4px 12px"
                border="1px solid"
                borderColor="white"
                whiteSpace="nowrap"
                backgroundColor="warning.main"
                color="gray.900"
            >
                Deployment pending
            </Box>
        </Box>
    )
}