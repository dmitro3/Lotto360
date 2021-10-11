export const Lotto360Abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "currentRoundId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "finalNumber",
                type: "uint256",
            },
        ],
        name: "RoundNumberDrawn",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endTime",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "ticketPrice",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "bonusBnbAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "bnbAddedFromLastRound",
                type: "uint256",
            },
        ],
        name: "RoundOpen",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "currentRoundId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endTime",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "bonusBnbAmount",
                type: "uint256",
            },
        ],
        name: "RoundUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "roundId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "numberTickets",
                type: "uint256",
            },
        ],
        name: "TicketsPurchase",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
            {
                internalType: "uint256[]",
                name: "_ticketNumbers",
                type: "uint256[]",
            },
        ],
        name: "buyTickets",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_seedNumber",
                type: "uint256",
            },
        ],
        name: "closeRoundAndPickWinningNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllTickets",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentRound",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum Lotto360.Status",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "cid",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "ticketPrice",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketIdNextRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "totalBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bonusBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bnbAddedFromLastRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "finalNumber",
                        type: "uint256",
                    },
                ],
                internalType: "struct Lotto360.Round",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentRoundForUser",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum Lotto360.Status",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "cid",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "ticketPrice",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketIdNextRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "totalBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bonusBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bnbAddedFromLastRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "finalNumber",
                        type: "uint256",
                    },
                ],
                internalType: "struct Lotto360.Round",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentRoundPools",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentRoundTickets",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMaxNumberTicketsPerBuyOrClaim",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getPoolsInCurrentRoundForUser",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
        ],
        name: "getPoolsInRound",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
        ],
        name: "getPoolsInRoundForUser",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
        ],
        name: "getRoundById",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum Lotto360.Status",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "cid",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "ticketPrice",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketIdNextRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "totalBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bonusBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bnbAddedFromLastRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "finalNumber",
                        type: "uint256",
                    },
                ],
                internalType: "struct Lotto360.Round",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
        ],
        name: "getRoundByIdForUser",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum Lotto360.Status",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "cid",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "ticketPrice",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketIdNextRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "totalBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bonusBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bnbAddedFromLastRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "finalNumber",
                        type: "uint256",
                    },
                ],
                internalType: "struct Lotto360.Round",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getRounds",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum Lotto360.Status",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "cid",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "ticketPrice",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "firstTicketIdNextRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "totalBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bonusBnbAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "bnbAddedFromLastRound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "finalNumber",
                        type: "uint256",
                    },
                ],
                internalType: "struct Lotto360.Round[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getSettings",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
        ],
        name: "getTicketsInRound",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getUserTicketsInCurrentRound",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_roundId",
                type: "uint256",
            },
        ],
        name: "getUserTicketsInRound",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_maxNumberTicketsPerBuyOrClaim",
                type: "uint256",
            },
        ],
        name: "setMaxNumberTicketsPerBuyOrClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_endTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_ticketPrice",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_bonusBnbAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_bnbAddedFromLastRound",
                type: "uint256",
            },
            {
                internalType: "uint256[]",
                name: "_pools",
                type: "uint256[]",
            },
        ],
        name: "startNewRound",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_endTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_bonusBnbAmount",
                type: "uint256",
            },
            {
                internalType: "uint256[]",
                name: "_pools",
                type: "uint256[]",
            },
        ],
        name: "updateCurrentRound",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
