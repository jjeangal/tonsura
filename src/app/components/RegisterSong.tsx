import { PasskeyArgType } from '@safe-global/protocol-kit'
import { Box, Heading, Text, Button } from "@chakra-ui/react";

import Tonsura from "../../generated/deployedContracts";
import { publicClient } from "../lib/client";

import { registerSong } from "../lib/registerSong";
import { useState } from "react";

type Props = {
    passkey: PasskeyArgType
}

export function RegisterSong({ passkey }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const contract = Tonsura[11155111][0].contracts.Tonsura;

    async function setArguments() {
        const urlParams = new URLSearchParams(window.location.search);

        const data = await publicClient.readContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "getSongId",
        });

        const newId = data.toString();
        const newName = urlParams.get("name") ?? "";
        const newTitle = urlParams.get("title") ?? "";

        const platformId = urlParams.get("platformId");
        const platformLink = urlParams.get("platformLink");

        let newLinks: { id: string, link: string }[] = [];
        if (platformId && platformLink) {
            newLinks = [{ id: platformId, link: platformLink }];
        }

        return { newId, newName, newTitle, newLinks };
    }

    async function jsonToIpfs(id: string, name: string, title: string, links: { id: string, link: string }[]) {
        const response = await fetch("./api/ipfs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                name: name,
                title: title,
                links: links
            }),
        });
        const result = await response.json();
        return result;
    }

    async function startRegisterSong() {
        const { newId, newName, newTitle, newLinks } = await setArguments();
        console.log('Arguments set:', { newId, newName, newTitle, newLinks });

        const response = await jsonToIpfs(newId, newName, newTitle, newLinks);
        console.log(response.data);
        await handleRegisterSong(response.data);
    }

    async function handleRegisterSong(metadata: string) {
        setIsLoading(true)

        const userOp = await registerSong(passkey, metadata!)

        setIsLoading(false)

        console.log('UserOp', userOp);
    }

    return (
        <Box p={4}>
            <Heading as="h1" size="md" mt={8} mb={4}>
                Oops...
            </Heading>
            <Text>The song does not exist on chain. Be the first to register it and get rewarded!</Text>
            <Button onClick={() => startRegisterSong()}>Register Song</Button>
        </Box>
    );
}