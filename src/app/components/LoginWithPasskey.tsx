import { Button, Divider, Box, VStack, Heading, Text, StackDivider } from '@chakra-ui/react'
import { PasskeyArgType } from '@safe-global/protocol-kit'
import { useState } from 'react'
import { loadPasskeysFromLocalStorage } from '../lib/passkeys'
import { BellIcon } from '@chakra-ui/icons'

type Props = {
    handleCreatePasskey: () => void
    handleSelectPasskey: (passkey: PasskeyArgType) => void
}

function LoginWithPasskey({ handleCreatePasskey, handleSelectPasskey }: Props) {
    const [passkeys, setPasskeys] = useState<PasskeyArgType[]>([])

    return (
        <Box
            margin="32px auto 0"
            p={8}
            boxShadow="md"
            borderRadius="md"
            width="100%"
            maxWidth="600px"
            bg="background.paper"
        >
            <VStack spacing={8} divider={<StackDivider borderColor="border.light" />}>
                <Heading as="h1" size="lg" textAlign="center" color="primary.main">
                    Use Safe Account via Passkeys
                </Heading>

                <Text textAlign="center" fontSize="xl">
                    Create a new Safe using Passkeys
                </Text>

                <Button
                    onClick={handleCreatePasskey}
                    leftIcon={<BellIcon />}
                    variant="outline"
                    mb={6}
                >
                    Create a new Passkey
                </Button>

                <Divider borderColor="border.light" />

                <Text textAlign="center" fontSize="xl">
                    Connect existing Safe using an existing PassKey
                </Text>

                <Button
                    leftIcon={<BellIcon />}
                    variant="solid"
                    colorScheme="blue"
                    onClick={async () => {
                        const passkeys = loadPasskeysFromLocalStorage()

                        setPasskeys(passkeys)
                        handleSelectPasskey(passkeys[0])
                    }}
                >
                    Use an existing Passkey
                </Button>
            </VStack>
        </Box>
    )
}

export default LoginWithPasskey
