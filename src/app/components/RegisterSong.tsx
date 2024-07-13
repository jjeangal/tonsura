import { Box, Heading, Text, Button } from "@chakra-ui/react";

export function RegisterSong() {

    return (
        <Box p={4}>
            <Heading as="h1" size="md" mt={8} mb={4}>
                Oops...
            </Heading>
            <Text>The song does not exist on chain. Be the first to register it and get rewarded!</Text>
            <Button>Register Song</Button>
        </Box>
    );
}