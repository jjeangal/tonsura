'use client';

import { Box, Flex, Table, Tbody, Tr, Td, Input, Button, Select, IconButton } from "@chakra-ui/react";
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { useState } from "react";
import { FaPlay, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function CreatePlaylist() {
    const [songs, setSongs] = useState([
        { title: "Roxane", artist: "The Police" },
        { title: "Desert Roses", artist: "Sting" },
    ]);
    const [newSong, setNewSong] = useState({ title: "", artist: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const addSong = () => {
        setSongs([...songs, newSong]);
        setNewSong({ title: "", artist: "" });
    };

    const removeSong = (index: number) => {
        setSongs(songs.filter((_, i) => i !== index));
    };

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSuccess = (result: ISuccessResult) => {
        // This is where you should perform frontend actions once a user has been verified
        window.alert(
            `Successfully verified with World ID!
        Your nullifier hash is: ` + result.nullifier_hash
        )
    }

    return (
        <Flex justify="center" align="center" minHeight="100vh" direction="column">
            <Box mb={4}>
                <Input
                    placeholder="Search for a song"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    mb={2}
                    w="300px"
                />
            </Box>
            <Box mb={4}>
                <Flex mb={4} w="300px" direction="column">
                    <Input
                        placeholder="Title"
                        value={newSong.title}
                        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                        mb={2}
                    />
                    <Input
                        placeholder="Address"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                        mb={2}
                    />
                    <Button onClick={addSong} leftIcon={<FaPlusCircle />} colorScheme="purple">
                        Add Song
                    </Button>
                </Flex>
            </Box>
            <Box>
                <Table variant="simple" w="300px">
                    <Tbody>
                        {filteredSongs.map((song, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Flex align="center">
                                        <Box as="span" mr={2}>
                                            {song.title}
                                        </Box>
                                        <Box as="span" color="gray.500">
                                            {song.artist}
                                        </Box>
                                    </Flex>
                                </Td>
                                <Td textAlign="right">
                                    <Flex align="center">
                                        <IconButton
                                            icon={<FaPlay />}
                                            onClick={() => console.log(`Play ${song.title}`)}
                                            size="sm"
                                            variant="ghost"
                                            mr={2}
                                            aria-label="Play"
                                        />
                                        <IconButton
                                            icon={<FaMinusCircle />}
                                            onClick={() => removeSong(index)}
                                            size="sm"
                                            variant="ghost"
                                            aria-label="Remove"
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Box mt={4}>
                Check Out Recommended:
                <Flex>
                    <a href="https://example.com/profile1" target="_blank" rel="noopener noreferrer">
                        <img src="https://via.placeholder.com/50" alt="Profile 1" style={{ borderRadius: "50%", margin: "0 5px" }} />
                    </a>
                    <a href="https://example.com/profile2" target="_blank" rel="noopener noreferrer">
                        <img src="https://via.placeholder.com/50" alt="Profile 2" style={{ borderRadius: "50%", margin: "0 5px" }} />
                    </a>
                    <a href="https://example.com/profile3" target="_blank" rel="noopener noreferrer">
                        <img src="https://via.placeholder.com/50" alt="Profile 3" style={{ borderRadius: "50%", margin: "0 5px" }} />
                    </a>
                </Flex>
            </Box>
            <Box mt={4}>
                <IDKitWidget
                    app_id="app_staging_b3f1d126732396a06f9848b2d2dae3af"
                    action="vote_1"
                    onSuccess={onSuccess}
                    verification_level={VerificationLevel.Device}
                >
                    {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
                </IDKitWidget>
            </Box>
        </Flex>
    );
}
