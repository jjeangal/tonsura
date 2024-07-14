// components/RegisterSong.tsx

import { Box, Heading, Text, Button, VStack, HStack, Input } from "@chakra-ui/react";
import Tonsura from "../../generated/deployedContracts";
import { publicClient } from "../lib/client";
import { registerSong } from "../lib/registerSong";
import { useState, useEffect } from "react";
import { loadPasskeysFromLocalStorage } from '../lib/passkeys';

export function RegisterSong() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [songDetails, setSongDetails] = useState<any>({});
    const [placeholder, setPlaceholder] = useState<string>("Confirm");

    const contract = Tonsura[11155111][0].contracts.Tonsura;

    useEffect(() => {
        async function fetchArguments() {
            const args = await setArguments();
            setSongDetails(args);
        }
        fetchArguments();
    }, []);

    async function setArguments() {
        const urlParams = new URLSearchParams(window.location.search);

        const data = await publicClient.readContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "getSongId",
        });

        const id = String(data);
        const name = urlParams.get("name") ?? "";
        const title = urlParams.get("title") ?? "";
        const platformId = urlParams.get("platformId");
        const platformLink = urlParams.get("platformLink");
        const thumbnail = urlParams.get("thumbnail") ?? "";
        const tagsString = urlParams.get("tags") ?? "";
        const tags = tagsString.split(",").map(tag => tag.trim());

        let newLinks: { id: string, link: string }[] = [];
        if (platformId && platformLink) {
            newLinks = [{ id: platformId, link: platformLink }];
        }

        return { id, name, title, newLinks, thumbnail, tags };
    }

    async function startRegisterSong() {
        const { id, name, title, newLinks, thumbnail, tags } = songDetails;
        console.log('Arguments set:', { id, name, title, newLinks, thumbnail, tags });

        const response = await fetch('/api/create-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: name,
                title: title,
                links: newLinks,
                thumbnail: thumbnail,
                tags: tags
            }),
        });
        const data = await response.json();
        await handleRegisterSong(data.Hash);
    }

    async function handleRegisterSong(metadata: string) {
        setIsLoading(true);
        const passkey = await loadPasskeysFromLocalStorage()[0];
        console.log(`https://api.thegraph.com/ipfs/api/v0/cat?arg=${metadata}`);
        const userExp = await registerSong(passkey, `https://api.thegraph.com/ipfs/api/v0/cat?arg=${metadata}`);
        setIsLoading(false);
        setPlaceholder(userExp.userOpHash);
    }

    return (
        <Box p={8} maxW="md" mx="auto" mt={10} bg="white" borderRadius="md" boxShadow="md">
            <Heading as="h1" size="lg" mt={8} mb={4} textAlign="center">
                Be the <Text as="span" textDecoration="line-through">first one</Text> to add this song to the <Text as="span" textDecoration="line-through">tonsura</Text> public collection
            </Heading>
            <VStack spacing={4} align="start" bg="purple.50" p={4} borderRadius="md">
                <Box>
                    <Text fontWeight="bold">Title</Text>
                    <Text>{songDetails.title || "N/A"}</Text>
                </Box>
                <Box>
                    <Text fontWeight="bold">Artist</Text>
                    <Text>{songDetails.name || "N/A"}</Text>
                </Box>
                <Box>
                    <Text fontWeight="bold">Link</Text>
                    <Text>{songDetails.newLinks?.[0]?.link || "N/A"}</Text>
                </Box>
            </VStack>
            <Button mt={4} colorScheme="blackAlpha" onClick={startRegisterSong} isLoading={isLoading}>
                {placeholder}
            </Button>
        </Box>
    );
}
