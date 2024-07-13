import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Tonsura from "../../generated/deployedContracts";
import { publicClient } from "../lib/client";

export function RegisterSong() {
    const [id, setSongId] = useState("0");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [links, setLinks] = useState<{ id: string, link: string }[]>([]);

    const contract = Tonsura[11155111][0].contracts.Tonsura;

    async function setArguments() {
        const urlParams = new URLSearchParams(window.location.search);

        const data = await publicClient.readContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "getSongId",
        });

        setSongId(data.toString());
        setName(urlParams.get("name") ?? "");
        setTitle(urlParams.get("title") ?? "");

        const platformId = urlParams.get("platformId");
        const platformLink = urlParams.get("platformLink");

        if (platformId && platformLink) {
            setLinks([{ id: platformId, link: platformLink }]);
        }
    };

    async function jsonToIpfs() {
        const response = await fetch("./ipfs", {
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

    async function registerSong() {
        await setArguments();
        const response = await jsonToIpfs();
        // mint
    }

    return (
        <Box p={4}>
            <Heading as="h1" size="md" mt={8} mb={4}>
                Oops...
            </Heading>
            <Text>The song does not exist on chain. Be the first to register it and get rewarded!</Text>
            <Button onClick={() => registerSong()}>Register Song</Button>
        </Box>
    );
}