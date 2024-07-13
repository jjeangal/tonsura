//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./song.sol";

// This contract is a factory for songs
contract Tonsura {
    mapping(uint256 => Song) public songs;

    uint256 public songCount;

    event SongCreated(uint256 songId);

    function CreateNewSong(
        string memory artistName,
        string memory albumName
    ) public {
        Song newSong = new Song(artistName, albumName);
        songs[songCount++] = newSong;
    }

    function AddLinkToSong(
        uint songIndex,
        uint platform,
        string memory link
    ) public {
        Song(address(songs[songIndex])).addLink(platform, link);
    }

    function updateLinkToSong(
        uint songIndex,
        uint platform,
        string memory link
    ) public {
        Song(address(songs[songIndex])).updateLink(platform, link);
    }

    function AddLinksToSong(
        uint songIndex,
        uint[] memory platforms,
        string[] memory links
    ) public {
        Song(address(songs[songIndex])).addLinks(platforms, links);
    }
}
