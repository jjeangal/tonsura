//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "../entities/playlist.sol";
import {ENSRegistry} from "./Registrar.sol";

// This contract is a factory for Creating Song Smart Contracts
contract TonsuraPlaylists {
    Playlist[] public playlists;

    ENSRegistry public registry;

    event SongCreated(uint256 songId, string metadata, address songAddress);

    constructor() {
        registry = ENSRegistry(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);
    }

    function createNewPlaylist(string memory metadata) public {
        Playlist newPlaylist = new Playlist(registry, metadata);
        playlists.push(newPlaylist);
        emit SongCreated(playlists.length - 1, metadata, address(newPlaylist));
    }

    function getPlaylistMetadata(
        uint256 playlistId
    ) public view returns (string memory) {
        return Playlist(address(playlists[playlistId])).metadata();
    }

    function setPlaylistMetadata(
        uint256 playlistId,
        string memory metadata
    ) public {
        Playlist(address(playlists[playlistId])).setMetadata(metadata);
    }

    function getPlaylistId() public view returns (uint256) {
        return playlists.length;
    }

    function getAllPlaylists() public view returns (Playlist[] memory) {
        return playlists;
    }
}
