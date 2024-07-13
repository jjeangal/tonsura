//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Song {
    // Music Platforms:
    // 0 - Spotify
    // 1 - Apple Music
    // 2 - Soundcloud
    // 3 - Youtube
    // 4 - Bandcamp
    // 5 - Audius
    // 6 - Tidal
    // 7 - Deezer
    // 8 - Amazon Music
    mapping(uint => string) public Links;

    string public artistName;
    // if not an album, set albumName to artistName
    string public albumName;

    constructor(string memory _artistName, string memory _albumName) {
        artistName = _artistName;
        albumName = _albumName;
    }

    function addLink(uint platform, string memory link) public {
        // verify if link starts by proper prefix?
        Links[platform] = link;
    }

    function addLinks(uint[] memory platforms, string[] memory links) public {
        for (uint i = 0; i < platforms.length; i++) {
            Links[platforms[i]] = links[i];
        }
    }

    function updateLink(uint platform, string memory link) public {
        // verify if link starts by proper prefix?
        Links[platform] = link;
    }

    function updateLinks(uint platform, string memory link) public {
        // verify if link starts by proper prefix?
        Links[platform] = link;
    }
}
