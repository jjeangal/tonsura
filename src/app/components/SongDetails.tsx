import { Box, Heading, Icon, Link, VStack, Flex } from "@chakra-ui/react";
import { CiShare2 } from "react-icons/ci";
import { useEffect, useState } from "react";

// Define the type for the tuple value
type SongLink = {
    platform: string;
    link: string;
};

// Function to fetch song links from smart contract
async function fetchSongLinks(): Promise<SongLink[]> {
    const array: SongLink[] = [
        { platform: "Spotify", link: "https://spotify.com" },
        { platform: "Apple Music", link: "https://music.apple.com" },
        { platform: "YouTube Music", link: "https://music.youtube.com" },
    ];
    return array;
}

export function SongDetails() {
    const [songLinks, setSongLinks] = useState<SongLink[]>([]);

    useEffect(() => {
        async function getSongLinks() {
            const links = await fetchSongLinks();
            setSongLinks(links);
        }

        getSongLinks();
    }, []);

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                Song Details
            </Heading>
            <VStack spacing={2} align="start">
                {songLinks.map((songLink, index) => (
                    <Flex key={index} alignItems="center" mb={2}>
                        <Box mr={2}>{songLink.platform}</Box>
                        <Link href={songLink.link} isExternal>
                            <Icon></Icon>
                        </Link>
                    </Flex>
                ))}
            </VStack>
            <Heading as="h2" size="md" mt={8} mb={4}>
                Share it now!
            </Heading>
            <Box>
                <Flex alignItems="center">
                    <Box mr={2}>https://tonsura.song.all</Box>
                    <Link href={'https://tonsura.song.all'} isExternal>
                        <CiShare2 />
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
}