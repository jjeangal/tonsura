//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.22;

import "../entities/song.sol";

// This contract is a factory for Creating Song Smart Contracts
contract TonsuraSongs {
    Song[] public songs;

    event SongCreated(uint256 songId, string metadata, address songAddress);

    function createNewSong(string memory metadata) public {
        Song newSong = new Song(metadata);
        songs.push(newSong);
        emit SongCreated(songs.length - 1, metadata, address(newSong));
    }

    function getSongMetadata(
        uint256 songId
    ) public view returns (string memory) {
        return Song(address(songs[songId])).metadata();
    }

    function setSongMetadata(uint256 songId, string memory metadata) public {
        Song(address(songs[songId])).setMetadata(metadata);
    }

    function getSongId() public view returns (uint256) {
        return songs.length;
    }

    function getAllSongs() public view returns (Song[] memory) {
        return songs;
    }
}
