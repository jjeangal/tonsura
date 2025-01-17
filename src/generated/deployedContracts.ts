const contracts = {
    11155111: [
        {
            chainId: "11155111",
            name: "seplolia",
            contracts: {
                Tonsura: {
                    address: "0xE06857dB29FB1b013f1695A74E6bdBcC14228BC6",
                    abi: [
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "internalType": "uint256",
                                    "name": "songId",
                                    "type": "uint256"
                                },
                                {
                                    "indexed": false,
                                    "internalType": "string",
                                    "name": "metadata",
                                    "type": "string"
                                },
                                {
                                    "indexed": false,
                                    "internalType": "address",
                                    "name": "songAddress",
                                    "type": "address"
                                }
                            ],
                            "name": "SongCreated",
                            "type": "event"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "metadata",
                                    "type": "string"
                                }
                            ],
                            "name": "createNewSong",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "getAllSongs",
                            "outputs": [
                                {
                                    "internalType": "contract Song[]",
                                    "name": "",
                                    "type": "address[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "getSongId",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "songId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getSongMetadata",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "songId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "metadata",
                                    "type": "string"
                                }
                            ],
                            "name": "setSongMetadata",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "songs",
                            "outputs": [
                                {
                                    "internalType": "contract Song",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ]
                }
            }
        }
    ]
} as const;

export default contracts;