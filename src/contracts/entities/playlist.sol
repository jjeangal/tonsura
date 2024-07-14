//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ENS} from "@ensdomains/ens-contracts/contracts/registry/ENS.sol";
import {ReverseClaimer} from "@ensdomains/ens-contracts/contracts/reverseRegistrar/ReverseClaimer.sol";

import "./song.sol";

contract Playlist is ReverseClaimer {
    Song[] public songs;
    string public metadata;
    string public name;

    event PlaylistCreated(
        uint256 playlistId,
        string metadata,
        address songAddress
    );

    constructor(
        ENS ens,
        string memory _metadata
    ) ReverseClaimer(ens, msg.sender) {
        metadata = _metadata;
    }

    function setMetadata(string memory _metadata) public {
        metadata = _metadata;
    }

    function setName(string memory _name) public {
        setName(_name);
    }
}
