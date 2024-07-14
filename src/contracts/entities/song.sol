//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.22;

contract Song {
    string public metadata;

    constructor(string memory _metadata) {
        metadata = _metadata;
    }

    function setMetadata(string memory _metadata) public {
        metadata = _metadata;
    }
}
