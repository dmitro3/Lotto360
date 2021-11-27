// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

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

    uint256 private withdrawCount = 0;
    uint256 private currentRoundId = 0;
    uint256 private currentTicketId = 1;
    uint256 private maxNumberTicketsPerBuyOrClaim = 50;

    constructor() {
        owner = msg.sender;
        bnbToken = IERC20(address(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984));
    }

    enum Status {
        Pending,
        Open,
        Close,
        Claimable
    }

    struct Round {
        Status status;
        uint256 cid;
        uint256 startTime;
        uint256 endTime;
        uint256 ticketPrice;
        uint256 firstTicketId;
        uint256 firstTicketIdNextRound;
        uint256 totalBnbAmount;
        uint256 bonusBnbAmount;
        uint256 bnbAddedFromLastRound;
        uint256 finalNumber;
    }

    struct Ticket {
        uint256 cid;
        uint256 number;
        address owner;
        bool isClaimed;
    }

    struct Withdraw {
        uint256 cid;
        uint256 amount;
        address recipient;
        uint256 time;
    }

    mapping(uint256 => Round) private rounds;
    mapping(uint256 => Withdraw) private withdraws;
    mapping(uint256 => uint256[]) private poolsInEachRound;
    mapping(uint256 => uint256) private ticketCountInEachRound;
    mapping(uint256 => mapping(uint256 => Ticket)) private ticketsInEachRound;
    mapping(address => mapping(uint256 => uint256)) private userTicketCountInEachRound;

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
        uint256 indexed roundId,
        uint256 numberTickets
    );
    event RoundOpen(
        uint256 id,
        uint256 endTime,
        uint256 ticketPrice,
        uint256 bonusBnbAmount,
        uint256 bnbAddedFromLastRound
    );
    event RoundNumberDrawn(uint256 indexed currentRoundId, uint256 finalNumber);
    event RoundUpdated(
        uint256 indexed currentRoundId,
        uint256 endTime,
        uint256 bonusBnbAmount
    );
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PrizeTransferred(address indexed winnerAddress, uint256 indexed amount);

    /**************************************************************************************************
     * @dev these are functions for user
     **************************************************************************************************/
    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function buyTickets(uint256 _roundId, uint256[] calldata _ticketNumbers)
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
        uint256 amountToPay = _ticketNumbers.length * rounds[_roundId].ticketPrice;

        // check users wallet for bnb amount
        uint256 userBnbSupply = bnbToken.balanceOf(msg.sender);
        require(userBnbSupply > amountToPay, "Balance too low");

        // transfer tokens to this contract
        bnbToken.transferFrom(msg.sender, address(this), amountToPay);

        // increment this round BNB amount
        rounds[_roundId].totalBnbAmount += amountToPay;

        // start for loop to add tickets
        for (uint256 i = 0; i < _ticketNumbers.length; i++) {
            uint256 ticketNumber = _ticketNumbers[i];
            require(
                (ticketNumber <= 1999999) && (ticketNumber >= 1000000),
                "Ticket number is not valid"
            );

            ticketsInEachRound[_roundId][ticketCountInEachRound[_roundId]] = Ticket({
                cid: currentTicketId,
                number: ticketNumber,
                owner: msg.sender,
                isClaimed: false
            });

            userTicketCountInEachRound[msg.sender][_roundId]++;
            ticketCountInEachRound[_roundId]++;
            currentTicketId++;
        }

        emit TicketsPurchase(msg.sender, _roundId, _ticketNumbers.length);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRoundForUser() external view nonContract returns (Round memory) {
        return rounds[currentRoundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getUserTicketsInCurrentRound()
        external
        view
        nonContract
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            bool[] memory
        )
    {
        uint256 count = userTicketCountInEachRound[msg.sender][currentRoundId];
        uint256[] memory cidArray = new uint256[](count);
        uint256[] memory numberArray = new uint256[](count);
        address[] memory addressArray = new address[](count);
        bool[] memory isClaimedArray = new bool[](count);

        uint256 ticketCount = ticketCountInEachRound[currentRoundId];
        uint256 arrayIndex = 0;

        for (uint256 i = 0; i < ticketCount; i++) {
            Ticket memory ticket = ticketsInEachRound[currentRoundId][i];
            if (ticket.owner == msg.sender) {
                cidArray[arrayIndex] = ticket.cid;
                numberArray[arrayIndex] = ticket.number;
                addressArray[arrayIndex] = ticket.owner;
                isClaimedArray[arrayIndex] = ticket.isClaimed;
                arrayIndex++;
            }
        }

        return (cidArray, numberArray, addressArray, isClaimedArray);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getPoolsInCurrentRoundForUser()
        external
        view
        nonContract
        returns (uint256[] memory)
    {
        return poolsInEachRound[currentRoundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getRoundByIdForUser(uint256 _roundId)
        external
        view
        nonContract
        returns (Round memory)
    {
        return rounds[_roundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getUserTicketsInRound(uint256 _roundId)
        external
        view
        nonContract
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            bool[] memory
        )
    {
        uint256 count = userTicketCountInEachRound[msg.sender][_roundId];
        uint256[] memory cidArray = new uint256[](count);
        uint256[] memory numberArray = new uint256[](count);
        address[] memory addressArray = new address[](count);
        bool[] memory isClaimedArray = new bool[](count);

        uint256 ticketCount = ticketCountInEachRound[_roundId];
        uint256 arrayIndex = 0;

        for (uint256 i = 0; i < ticketCount; i++) {
            Ticket memory ticket = ticketsInEachRound[_roundId][i];
            if (ticket.owner == msg.sender) {
                cidArray[arrayIndex] = ticket.cid;
                numberArray[arrayIndex] = ticket.number;
                addressArray[arrayIndex] = ticket.owner;
                isClaimedArray[arrayIndex] = ticket.isClaimed;
                arrayIndex++;
            }
        }

        return (cidArray, numberArray, addressArray, isClaimedArray);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getPoolsInRoundForUser(uint256 _roundId)
        external
        view
        nonContract
        returns (uint256[] memory)
    {
        return poolsInEachRound[_roundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getMaxNumberTicketsPerBuyOrClaim()
        external
        view
        nonContract
        returns (uint256)
    {
        return maxNumberTicketsPerBuyOrClaim;
    }

    /**************************************************************************************************
     * @dev these are functions for owner
     **************************************************************************************************/
    // ✅
    function transferOwnership(address newOwner) external onlyOwner nonContract {
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function claimPrize(
        uint256[] calldata _roundIds,
        uint256[] calldata _ticketIds,
        address _winnerAddress,
        uint256 _amount
    ) external onlyOwner nonContract {
        require(_roundIds.length == _ticketIds.length, "inputs not valid");
        uint256 count = _roundIds.length;

        for (uint256 i = 0; i < count; i++) {
            uint256 roundId = _roundIds[i];
            uint256 ticketId = _ticketIds[i];

            Round memory round = rounds[roundId];
            ticketsInEachRound[roundId][ticketId - round.firstTicketId].isClaimed = true;
        }

        uint256 currentBalance = bnbToken.balanceOf(address(this));
        require(currentBalance >= _amount, "insufficient contract balance");
        bnbToken.transfer(_winnerAddress, _amount);
        emit PrizeTransferred(_winnerAddress, _amount);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function transferToken(address _targetAddress, uint256 _amount)
        external
        onlyOwner
        nonContract
    {
        uint256 currentBalance = bnbToken.balanceOf(address(this));
        require(currentBalance >= _amount, "insufficient contract balance");
        bnbToken.transfer(_targetAddress, _amount);

        withdraws[withdrawCount] = Withdraw({
            cid: withdrawCount + 1,
            amount: _amount,
            recipient: _targetAddress,
            time: block.timestamp
        });
        withdrawCount++;

        emit PrizeTransferred(_targetAddress, _amount);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getWithdraws()
        external
        view
        onlyOwner
        nonContract
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            uint256[] memory
        )
    {
        uint256[] memory cids = new uint256[](withdrawCount);
        uint256[] memory amounts = new uint256[](withdrawCount);
        address[] memory recipients = new address[](withdrawCount);
        uint256[] memory times = new uint256[](withdrawCount);

        for (uint256 i = 0; i < withdrawCount; i++) {
            cids[i] = withdraws[i].cid;
            amounts[i] = withdraws[i].amount;
            recipients[i] = withdraws[i].recipient;
            times[i] = withdraws[i].time;
        }

        return (cids, amounts, recipients, times);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function startNewRound(
        uint256 _endTime,
        uint256 _ticketPrice,
        uint256 _bonusBnbAmount,
        uint256 _bnbAddedFromLastRound,
        uint256[] calldata _pools
    ) external onlyOwner nonContract {
        require(
            currentRoundId == 0 || rounds[currentRoundId].status == Status.Close,
            "Current round is not finished"
        );

        require(_pools.length == 7, "Pool data is not correct");

        require(_endTime > block.timestamp, "Round endTime passed");

        currentRoundId++;

        poolsInEachRound[currentRoundId] = _pools;
        rounds[currentRoundId] = Round({
            cid: currentRoundId,
            status: Status.Open,
            startTime: block.timestamp,
            endTime: _endTime,
            ticketPrice: _ticketPrice,
            firstTicketId: currentTicketId,
            firstTicketIdNextRound: currentTicketId,
            totalBnbAmount: 0,
            bonusBnbAmount: _bonusBnbAmount,
            bnbAddedFromLastRound: _bnbAddedFromLastRound,
            finalNumber: 1000000
        });

        emit RoundOpen(
            currentRoundId,
            _endTime,
            _ticketPrice,
            _bonusBnbAmount,
            _bnbAddedFromLastRound
        );
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function updateCurrentRound(
        uint256 _endTime,
        uint256 _bonusBnbAmount,
        uint256[] calldata _pools
    ) external onlyOwner nonContract {
        require(
            rounds[currentRoundId].status == Status.Open,
            "Current round is not open"
        );
        require(_pools.length == 7, "Pool data is not correct");
        require(_endTime > block.timestamp, "Round endTime passed");

        poolsInEachRound[currentRoundId] = _pools;

        rounds[currentRoundId].endTime = _endTime;
        rounds[currentRoundId].bonusBnbAmount = _bonusBnbAmount;

        emit RoundUpdated(currentRoundId, _endTime, _bonusBnbAmount);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function closeRoundAndPickWinningNumber(uint256 _seedNumber)
        external
        onlyOwner
        nonContract
    {
        require(
            rounds[currentRoundId].endTime < block.timestamp,
            "Round time is not finished"
        );

        require(rounds[currentRoundId].status == Status.Open, "Round is not open");

        rounds[currentRoundId].status = Status.Close;
        rounds[currentRoundId].firstTicketIdNextRound = currentTicketId;
        uint256 finalNumber = generateRandomNumber(_seedNumber);
        rounds[currentRoundId].finalNumber = finalNumber;

        emit RoundNumberDrawn(currentRoundId, finalNumber);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function generateRandomNumber(uint256 _seedNumber) private view returns (uint256) {
        uint256 number = uint256(
            keccak256(
                abi.encodePacked(
                    currentRoundId,
                    currentTicketId,
                    blockhash(block.number - 1),
                    block.timestamp,
                    _seedNumber
                )
            )
        );

        return 1000000 + (number % 1000000);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getRoundById(uint256 _roundId)
        external
        view
        onlyOwner
        nonContract
        returns (Round memory)
    {
        return rounds[_roundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getTicketsInRound(uint256 _roundId)
        external
        view
        onlyOwner
        nonContract
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            bool[] memory
        )
    {
        uint256 ticketCounts = ticketCountInEachRound[_roundId];
        uint256[] memory cidArray = new uint256[](ticketCounts);
        uint256[] memory numberArray = new uint256[](ticketCounts);
        address[] memory addressArray = new address[](ticketCounts);
        bool[] memory isClaimedArray = new bool[](ticketCounts);

        for (uint256 i = 0; i < ticketCounts; i++) {
            cidArray[i] = ticketsInEachRound[_roundId][i].cid;
            numberArray[i] = ticketsInEachRound[_roundId][i].number;
            addressArray[i] = ticketsInEachRound[_roundId][i].owner;
            isClaimedArray[i] = ticketsInEachRound[_roundId][i].isClaimed;
        }

        return (cidArray, numberArray, addressArray, isClaimedArray);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getPoolsInRound(uint256 _roundId)
        external
        view
        onlyOwner
        nonContract
        returns (uint256[] memory)
    {
        return poolsInEachRound[_roundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRound()
        external
        view
        onlyOwner
        nonContract
        returns (Round memory)
    {
        return rounds[currentRoundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRoundTickets()
        external
        view
        onlyOwner
        nonContract
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            bool[] memory
        )
    {
        uint256 ticketCounts = ticketCountInEachRound[currentRoundId];
        uint256[] memory cidArray = new uint256[](ticketCounts);
        uint256[] memory numberArray = new uint256[](ticketCounts);
        address[] memory addressArray = new address[](ticketCounts);
        bool[] memory isClaimedArray = new bool[](ticketCounts);

        for (uint256 i = 0; i < ticketCounts; i++) {
            cidArray[i] = ticketsInEachRound[currentRoundId][i].cid;
            numberArray[i] = ticketsInEachRound[currentRoundId][i].number;
            addressArray[i] = ticketsInEachRound[currentRoundId][i].owner;
            isClaimedArray[i] = ticketsInEachRound[currentRoundId][i].isClaimed;
        }

        return (cidArray, numberArray, addressArray, isClaimedArray);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getCurrentRoundPools()
        external
        view
        onlyOwner
        nonContract
        returns (uint256[] memory)
    {
        return poolsInEachRound[currentRoundId];
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function getAllTickets()
        external
        view
        onlyOwner
        nonContract
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            bool[] memory
        )
    {
        uint256[] memory cidArray = new uint256[](currentTicketId - 1);
        uint256[] memory numberArray = new uint256[](currentTicketId - 1);
        address[] memory addressArray = new address[](currentTicketId - 1);
        bool[] memory isClaimedArray = new bool[](currentTicketId - 1);

        for (uint256 i = 1; i <= currentRoundId; i++) {
            for (uint256 j = 0; j < ticketCountInEachRound[i]; j++) {
                Ticket memory ticket = ticketsInEachRound[i][j];
                cidArray[ticket.cid - 1] = ticket.cid;
                numberArray[ticket.cid - 1] = ticket.number;
                addressArray[ticket.cid - 1] = ticket.owner;
                isClaimedArray[ticket.cid - 1] = ticket.isClaimed;
            }
        }

        return (cidArray, numberArray, addressArray, isClaimedArray);
    }

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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

    // ✅ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function setMaxNumberTicketsPerBuyOrClaim(uint256 _maxNumberTicketsPerBuyOrClaim)
        external
        onlyOwner
        nonContract
    {
        maxNumberTicketsPerBuyOrClaim = _maxNumberTicketsPerBuyOrClaim;
    }
}
