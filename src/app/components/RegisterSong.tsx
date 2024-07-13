import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

// import { useReadContract } from 'wagmi'

// import Tonsura from '../../generated/deployedContracts';

export function RegisterSong() {

    const [songId, setSongId] = useState(0);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [links, setLinks] = useState([]);

    // const contract = Tonsura[11155111][0].contracts.CoalNFT;

    function getSetUrlArguments() {
        const urlParams = new URLSearchParams(window.location.search);
        setName("name");
        setTitle("title");
        setLinks([]);
    };

    // const { data: currentSongId } = useReadContract({
    //     address: contract.address,
    //     abi: contract.abi,
    //     functionName: "getCurrentSongId",
    // });

    // useEffect(() => {
    //     if (currentSongId) {
    //         setSongId(currentSongId);
    //     }
    //     console.log(currentSongId);
    // }, [currentSongId]);

    // async function jsonToIpfs() {
    //     const response = await fetch("./ipfs", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id: String(songId),
    //             name: name,
    //             title: title,
    //             author: author,
    //             fileDetails: fileDetails,
    //             statistics: statistics,
    //             isFeaturing: isFeaturing,
    //         }),
    //     });
    //     const result = await response.json();
    //     return result;
    // }

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