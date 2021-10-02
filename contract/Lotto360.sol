// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Lotto360 {
    address private owner;
    IERC20 private bnbToken;

    uint256 private currentRoundId = 1;
    uint256 private currentTicketId = 1;
    uint256 public maxNumberTicketsPerBuyOrClaim = 100;

    enum Status {
        Pending,
        Open,
        Close,
        Claimable
    }

    struct Round {
        Status status;
        uint256 startTime;
        uint256 endTime;
        uint256 ticketPrice;
        uint256 firstTicketId;
        uint256 firstTicketIdNextRound;
        uint256 totalBnbAmount;
        uint256 bonusBnbAmount;
        uint32 finalNumber;
    }

    struct Ticket {
        uint32 number;
        address owner;
    }

    mapping(uint256 => Round) private rounds;
    mapping(uint256 => uint256) private ticketCountInEachRound;
    mapping(uint256 => mapping(uint256 => Ticket)) private ticketsInEachRound;

    modifier nonContract() {
        require(tx.origin == msg.sender, "Contract not allowed");
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getRounds() public view onlyOwner nonContract returns (Round[] memory) {
        uint256 length = currentRoundId;
        Round[] memory roundArray = new Round[](length);

        for (uint256 i = 0; i < length; i++) {
            roundArray[i] = rounds[i];
        }

        return roundArray;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getRoundById(uint256 _roundId)
        public
        view
        onlyOwner
        nonContract
        returns (Round memory)
    {
        return rounds[_roundId];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRound() public view onlyOwner nonContract returns (Round memory) {
        return rounds[currentRoundId];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getTicketsInRound(uint256 _roundId)
        public
        view
        onlyOwner
        nonContract
        returns (Ticket[] memory)
    {
        uint256 ticketCounts = ticketCountInEachRound[_roundId];
        Ticket[] memory tickets = new Ticket[](ticketCounts);

        for (uint256 i = 0; i < ticketCounts; i++) {
            tickets[i] = ticketsInEachRound[_roundId][i];
        }

        return tickets;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getSettings()
        public
        view
        onlyOwner
        nonContract
        returns (
            address,
            uint256,
            uint256,
            uint256
        )
    {
        return (owner, currentRoundId, currentTicketId, maxNumberTicketsPerBuyOrClaim);
    }
}
