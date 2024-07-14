import { Box, Heading, Text, Button } from "@chakra-ui/react";

import Tonsura from "../../generated/deployedContracts";
import { publicClient } from "../lib/client";

import { registerSong } from "../lib/registerSong";
import { useState } from "react";
import { loadPasskeysFromLocalStorage } from '../lib/passkeys';

export function RegisterSong() {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const contract = Tonsura[11155111][0].contracts.Tonsura;

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
        // get tags as an array for the json format
        const tags = tagsString.split(",").map(tag => tag.trim());

        let newLinks: { id: string, link: string }[] = [];

        if (platformId && platformLink) {
            newLinks = [{ id: platformId, link: platformLink }];
        }

        return { id, name, title, newLinks, thumbnail, tags };
    }

    async function jsonToIpfs
        (
            id: string,
            name: string,
            title: string,
            links: { id: string, link: string }[],
            thumbnail: string,
            tags: string[],

        ) {
        const response = await fetch("./api/ipfs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                name: name,
                title: title,
                links: links,
                thumbnail: thumbnail,
                tags: tags
            }),
        });
        const result = await response.json();
        return result;
    }

    async function startRegisterSong() {
        const { id, name, title, newLinks, thumbnail, tags } = await setArguments();
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
        console.log(data.Hash);

        await handleRegisterSong(data.Hash);
    }

    async function handleRegisterSong(metadata: string) {
        setIsLoading(true)

        const passkey = await loadPasskeysFromLocalStorage()[0];
        console.log(passkey);
        const userOp = await registerSong(passkey, `https://api.thegraph.com/ipfs/api/v0/cat?arg=${metadata}`);

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