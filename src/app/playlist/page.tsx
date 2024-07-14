'use client';

import { Box, Flex, Table, Tbody, Tr, Td, Input, Button, Select, IconButton } from "@chakra-ui/react";
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { useState } from "react";
import { FaPlay, FaPlusCircle } from "react-icons/fa";

export default function CreatePlaylist() {
    const [songs, setSongs] = useState([
        { title: "music1_title", artist: "artist" },
        { title: "music2_title", artist: "artist" },
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
                <Select
                    placeholder="Next song"
                    onChange={(e) => {
                        const selectedSong = songs.find(song => song.title === e.target.value);
                        if (selectedSong) {
                            setNewSong(selectedSong);
                        }
                    }}
                    mb={2}
                    w="300px"
                >
                    {songs.map((song, index) => (
                        <option key={index} value={song.title}>
                            {song.title}
                        </option>
                    ))}
                </Select>
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
                                    <IconButton
                                        icon={<FaPlay />}
                                        onClick={() => console.log(`Play ${song.title}`)}
                                        size="sm"
                                        variant="ghost"
                                        mr={2} aria-label={""} />
                                    <IconButton
                                        icon={<FaPlusCircle />}
                                        onClick={() => removeSong(index)}
                                        size="sm"
                                        variant="ghost" aria-label={""} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Box mt={4}>
                Check out:
                <Flex>
                    <img src="https://via.placeholder.com/50" alt="Profile 1" style={{ borderRadius: "50%", margin: "0 5px" }} />
                    <img src="https://via.placeholder.com/50" alt="Profile 2" style={{ borderRadius: "50%", margin: "0 5px" }} />
                    <img src="https://via.placeholder.com/50" alt="Profile 3" style={{ borderRadius: "50%", margin: "0 5px" }} />
                </Flex>
            </Box>
            <Box>
                <IDKitWidget
                    app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // obtained from the Developer Portal
                    action="vote_1" // this is your action id from the Developer Portal
                    onSuccess={onSuccess} // callback when the modal is closed
                    verification_level={VerificationLevel.Device}
                >
                    {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
                </IDKitWidget>
            </Box>
        </Flex>
    );
}
