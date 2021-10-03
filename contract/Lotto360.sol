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
    uint256 private maxNumberTicketsPerBuyOrClaim = 50;

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
        uint256 bnbAddedFromLastRound;
        string finalNumber;
    }

    struct Ticket {
        uint32 number;
        address owner;
    }

    struct Pool {
        string name;
        uint256 percentage;
    }

    mapping(uint256 => Round) private rounds;
    mapping(uint256 => Pool[]) private poolsInEachRound;
    mapping(uint256 => uint256) private ticketCountInEachRound;
    mapping(uint256 => mapping(uint256 => Ticket)) private ticketsInEachRound;

    /**************************************************************************************************
     * @dev these are modifiers
     **************************************************************************************************/
    modifier nonContract() {
        require(tx.origin == msg.sender, "Contract not allowed");
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /**************************************************************************************************
     * @dev these are events
     **************************************************************************************************/
    event TicketsPurchase(
        address indexed buyer,
        uint256 indexed lotteryId,
        uint256 numberTickets
    );

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**************************************************************************************************
     * @dev these are functions for user
     **************************************************************************************************/
    function buyTickets(uint256 _roundId, uint32[] calldata _ticketNumbers)
        external
        nonContract
    {
        require(_ticketNumbers.length != 0, "No ticket specified");
        require(
            _ticketNumbers.length <= maxNumberTicketsPerBuyOrClaim,
            "Too many tickets"
        );

        require(rounds[_roundId].status == Status.Open, "Round is not open");
        require(block.timestamp < rounds[_roundId].endTime, "Round is over");

        // calculate number of bnb user should pay
        // check users wallet for bnb amount
        // transfer tokens to this contract
        // increment this round BNB amount
        // start for loop to add tickets
        /**
        * 1 check this:
        require(
                (thisTicketNumber >= 1000000) && (thisTicketNumber <= 1999999),
                "Outside range"
            );
            * 2 add new ticket to ticketsInEachRound then in crement current ticket id

         */
        // done
        emit TicketsPurchase(msg.sender, _roundId, _ticketNumbers.length);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRoundForUser()
        external
        view
        nonContract
        returns (
            Round memory,
            Ticket[] memory,
            Pool[] memory
        )
    {
        Ticket[] memory ticketArray;
        uint256 ticketCount = ticketCountInEachRound[currentRoundId];
        uint256 arrayIndex = 0;

        for (uint256 i = 0; i < ticketCount; i++) {
            Ticket memory ticket = ticketsInEachRound[currentRoundId][i];
            if (ticket.owner == msg.sender) {
                ticketArray[arrayIndex] = ticket;
                arrayIndex++;
            }
        }

        return (rounds[currentRoundId], ticketArray, poolsInEachRound[currentRoundId]);
    }

    /**************************************************************************************************
     * @dev these are functions for owner
     **************************************************************************************************/
    function transferOwnership(address newOwner) external onlyOwner nonContract {
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getRounds() external view onlyOwner nonContract returns (Round[] memory) {
        uint256 length = currentRoundId;
        Round[] memory roundArray = new Round[](length);

        for (uint256 i = 0; i < length; i++) {
            roundArray[i] = rounds[i];
        }

        return roundArray;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getRoundById(uint256 _roundId)
        external
        view
        onlyOwner
        nonContract
        returns (Round memory)
    {
        return rounds[_roundId];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRound()
        external
        view
        onlyOwner
        nonContract
        returns (Round memory)
    {
        return rounds[currentRoundId];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getTicketsInRound(uint256 _roundId)
        external
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
        external
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
