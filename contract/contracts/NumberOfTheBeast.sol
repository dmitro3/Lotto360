// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

contract NumberOfTheBeast {
    address private owner;
    uint256 ctFee = 5;
    uint256 private currentRoundId = 0;
    uint8 public prizeMultiplier = 20;
    uint256 public minRoundAmount = 10000000000000000; // 0.01 bnb
    uint256 public maxRoundAmount = 200000000000000000; // 0.2 bnb

    constructor() {
        owner = msg.sender;
    }

    enum RoundStatus {
        Ready,
        Closed
    }

    struct Round {
        uint256 id;
        uint256 amount;
        uint256 purchaseTime;
        uint256 spinTime;
        uint256 ctFee;
        uint8 multiplier;
        uint256 guess;
        uint256 result;
        address user;
        RoundStatus status;
    }

    mapping(uint256 => Round) private Rounds;
    mapping(address => uint256[]) private UserRounds;

    /**************************************************************************************************
     * @dev modifiers
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
     * @dev events
     **************************************************************************************************/
    event RoundPurchased(uint256 id, address user, uint256 amount, uint256 time, uint256 multiplier);

    event RoundDropped(
        uint256 id,
        address user,
        uint256 amount,
        uint8 guess,
        uint8 result,
        uint256 time,
        uint256 multiplier
    );

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event MinRoundAmountUpdated(uint256 minRoundAmount);
    event MaxRoundAmountUpdated(uint256 maxRoundAmount);
    event TokenTransferred(address to, uint256 amount);
    event MultiplierUpdated(uint8 multiplier);
    event InjectFunds(address indexed sender);

    /**************************************************************************************************
     * @dev Controunder Functions
     **************************************************************************************************/
    function FundsInject() public payable {
        emit InjectFunds(msg.sender);
    }

    function SetContractFee(uint8 _ctFee) external onlyOwner nonContract {
        ctFee = _ctFee;
    }

    function SetPrizeMultiplier(uint8 _prizeMultiplier) external onlyOwner nonContract {
        prizeMultiplier = _prizeMultiplier;
        emit MultiplierUpdated(prizeMultiplier);
    }

    function SetMinRoundAmount(uint256 _minRoundAmount) external onlyOwner nonContract {
        minRoundAmount = _minRoundAmount;
        emit MinRoundAmountUpdated(minRoundAmount);
    }

    function SetMaxRoundAmount(uint256 _maxRoundAmount) external onlyOwner nonContract {
        maxRoundAmount = _maxRoundAmount;
        emit MaxRoundAmountUpdated(maxRoundAmount);
    }

    function transferOwnership(address newOwner) external onlyOwner nonContract {
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /**************************************************************************************************
     * @dev MainGame Functions
     **************************************************************************************************/
    function PurchaseRound() public payable nonContract {
        require(msg.value >= minRoundAmount, "Round amount must be greater than minimum amount");
        require(msg.value <= maxRoundAmount, "Round amount must be less than maximum amount");

        require(!_anyReadyRounds(msg.sender), "You already purchase a round");

        uint256 toPay = ((msg.value - ((msg.value / 100) * ctFee)) * prizeMultiplier);
        require(address(this).balance > toPay, "Round prize is bigger than contract balance, try small amount");

        currentRoundId++;

        Rounds[currentRoundId - 1] = Round({
            id: currentRoundId,
            amount: msg.value,
            purchaseTime: block.timestamp,
            spinTime: 0,
            ctFee: ctFee,
            multiplier: prizeMultiplier,
            guess: 0,
            result: 0,
            user: msg.sender,
            status: RoundStatus.Ready
        });

        UserRounds[msg.sender].push(currentRoundId);

        emit RoundPurchased(currentRoundId, msg.sender, msg.value, block.timestamp, prizeMultiplier);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function Spin(
        uint8 guess,
        uint256 seed,
        uint256 roundId,
        address user
    ) public onlyOwner nonContract returns (uint256) {
        require(guess < 0, "Number should not be negative");
        require(guess < 2000, "Number should be less than 999");

        Round memory round = Rounds[roundId - 1];
        require(round.status == RoundStatus.Ready, "Round is spinned before");
        require(user == round.user, "Round belongs to other user");

        uint256 result = uint256(_generateRandomDice(seed));

        Rounds[roundId - 1].spinTime = block.timestamp;
        Rounds[roundId - 1].guess = guess;
        Rounds[roundId - 1].result = result;
        Rounds[roundId - 1].status = RoundStatus.Closed;

        if (guess == result) {
            uint256 toPay = ((round.amount - ((round.amount / 100) * ctFee)) * prizeMultiplier);
            _transferTokens(round.user, toPay);
        }
        return result;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function _generateRandomDice(uint256 _seed) private view onlyOwner nonContract returns (uint256) {
        uint256 number = uint256(
            keccak256(
                abi.encodePacked(
                    _seed,
                    block.number,
                    block.coinbase,
                    block.gaslimit,
                    block.timestamp,
                    blockhash(block.number - 1)
                )
            )
        );

        return (number % 1000) + 1000;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function _anyReadyRounds(address user) private view returns (bool) {
        uint256[] memory userRounds = UserRounds[user];
        for (uint256 i = 0; i < userRounds.length; i++) {
            uint256 roundId = userRounds[i];
            if (Rounds[roundId - 1].status == RoundStatus.Ready) {
                return true;
            }
        }
        return false;
    }

    /**************************************************************************************************
     * @dev Payment Functions
     **************************************************************************************************/
    function _transferTokens(address _to, uint256 _amount) private onlyOwner nonContract {
        uint256 currentBalance = address(this).balance;
        require(currentBalance >= _amount, "insufficient contract balance");
        payable(_to).transfer(_amount);

        emit TokenTransferred(_to, _amount);
    }

    function WithdrawToken(address to, uint256 amount) public onlyOwner nonContract {
        _transferTokens(to, amount);
    }

    /**************************************************************************************************
     * @dev Getter Functions
     **************************************************************************************************/
    function GetRounds() public view onlyOwner nonContract returns (Round[] memory) {
        Round[] memory rounds = new Round[](currentRoundId);
        for (uint256 i = 0; i < currentRoundId; i++) {
            rounds[i] = Rounds[i];
        }
        return rounds;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetSpinById(uint256 roundId) public view onlyOwner returns (Round memory) {
        return Rounds[roundId - 1];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetUserRounds(address userAddress) public view onlyOwner nonContract returns (Round[] memory) {
        uint256[] memory userRounds = UserRounds[userAddress];
        uint256 size = userRounds.length;
        Round[] memory rounds = new Round[](size);

        for (uint256 i = 0; i < size; i++) {
            uint256 roundId = userRounds[i];
            rounds[i] = Rounds[roundId - 1];
        }
        return rounds;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function UserGetSpinById(uint256 roundId) public view returns (Round memory) {
        Round memory round;
        if (Rounds[roundId - 1].user == msg.sender) {
            round = Rounds[roundId - 1];
        }
        return round;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetReadyRound() public view returns (Round memory) {
        uint256[] memory userRounds = UserRounds[msg.sender];
        Round memory round;
        for (uint256 i = 0; i < userRounds.length; i++) {
            uint256 roundId = userRounds[i];
            if (Rounds[roundId - 1].status == RoundStatus.Ready) {
                round = Rounds[roundId - 1];
            }
        }
        return round;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetMyHistory() public view returns (Round[] memory) {
        uint256[] memory userRounds = UserRounds[msg.sender];
        uint256 size = userRounds.length;
        Round[] memory rounds = new Round[](size);

        for (uint256 i = 0; i < size; i++) {
            uint256 roundId = userRounds[i];
            rounds[i] = Rounds[roundId - 1];
        }
        return rounds;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetSettingForUser()
        public
        view
        returns (
            uint8,
            uint256,
            uint256
        )
    {
        return (prizeMultiplier, minRoundAmount, maxRoundAmount);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetSettingForAdmin()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (prizeMultiplier, minRoundAmount, maxRoundAmount, ctFee, currentRoundId, owner);
    }
}
