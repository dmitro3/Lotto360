// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

contract Dice360 {
    address private owner;
    uint256 private ctFee = 5;
    uint256 private currentRollId = 0;
    uint8 public prizeMultiplier = 8;
    uint256 private zulu = 1000;
    uint256 public minRollAmount = 25000000000000000; // 0.025 bnb
    uint256 public maxRollAmount = 30000000000000000; // 0.03 bnb

    constructor() {
        owner = msg.sender;
    }

    enum RollStatus {
        Ready,
        Closed
    }

    struct Roll {
        uint256 id;
        uint256 amount;
        uint256 purchaseTime;
        uint256 rollTime;
        uint256 ctFee;
        uint8 multiplier;
        uint8 guess;
        uint8 result;
        address user;
        RollStatus status;
    }

    mapping(uint256 => Roll) private Rolls;
    mapping(address => uint256[]) private UserRolls;

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
    event RollPurchased(uint256 id, address user, uint256 amount, uint256 time, uint256 multiplier);

    event RollDropped(
        uint256 id,
        address user,
        uint256 amount,
        uint8 guess,
        uint8 result,
        uint256 time,
        uint256 multiplier
    );

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event MinRollAmountUpdated(uint256 minRollAmount);
    event MaxRollAmountUpdated(uint256 maxRollAmount);
    event TokenTransferred(address to, uint256 amount);
    event MultiplierUpdated(uint8 multiplier);
    event InjectFunds(address indexed sender);

    /**************************************************************************************************
     * @dev Controller Functions
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

    function SetMinRollAmount(uint256 _minRollAmount) external onlyOwner nonContract {
        minRollAmount = _minRollAmount;
        emit MinRollAmountUpdated(minRollAmount);
    }

    function SetMaxRollAmount(uint256 _maxRollAmount) external onlyOwner nonContract {
        maxRollAmount = _maxRollAmount;
        emit MaxRollAmountUpdated(maxRollAmount);
    }

    function transferOwnership(address newOwner) external onlyOwner nonContract {
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /**************************************************************************************************
     * @dev MainGame Functions
     **************************************************************************************************/
    function PurchaseRoll() public payable nonContract {
        require(msg.value >= minRollAmount, "Roll amount must be greater than minimum amount");
        require(msg.value <= maxRollAmount, "Roll amount must be less than maximum amount");

        require(!_anyReadyRolls(msg.sender), "You already purchase a roll");

        uint256 toPay = ((msg.value - ((msg.value / 100) * ctFee)) * prizeMultiplier);
        require(address(this).balance > toPay, "Roll prize is bigger than contract balance, try small amount");

        currentRollId++;

        Rolls[currentRollId - 1] = Roll({
            id: currentRollId,
            amount: msg.value,
            purchaseTime: block.timestamp,
            rollTime: 0,
            ctFee: ctFee,
            multiplier: prizeMultiplier,
            guess: 0,
            result: 0,
            user: msg.sender,
            status: RollStatus.Ready
        });

        UserRolls[msg.sender].push(currentRollId);

        emit RollPurchased(currentRollId, msg.sender, msg.value, block.timestamp, prizeMultiplier);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function DropDice(
        uint8 guess,
        uint256 seed,
        uint256 rollId,
        address user
    ) public onlyOwner nonContract returns (uint8) {
        require(guess > 0, "Dice number should be greater than 0");
        require(guess < 7, "Dice number should be less than 7");

        Roll memory roll = Rolls[rollId - 1];
        require(roll.status == RollStatus.Ready, "Roll is dropped before");
        require(user == roll.user, "Roll belongs to other user");

        uint8 result = uint8(_generateRandomDice(seed, roll, guess));

        Rolls[rollId - 1].guess = guess;
        Rolls[rollId - 1].rollTime = block.timestamp;
        Rolls[rollId - 1].status = RollStatus.Closed;
        Rolls[rollId - 1].result = result;

        if (guess == result) {
            uint256 toPay = (roll.amount - ((roll.amount / 100) * ctFee)) * prizeMultiplier;
            _transferTokens(roll.user, toPay);
        }
        emit RollDropped(roll.id, roll.user, roll.amount, guess, result, block.timestamp, roll.multiplier);
        return result;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function _generateRandomDice(
        uint256 _seed,
        Roll memory roll,
        uint256 guess
    ) private onlyOwner nonContract returns (uint256) {
        uint256 number = uint256(
            keccak256(
                abi.encodePacked(
                    _seed +
                        block.number +
                        (uint256(keccak256(abi.encodePacked((block.coinbase)))) / block.gaslimit) +
                        block.timestamp +
                        uint256(blockhash(block.number - 1))
                )
            )
        );

        uint256 toPay = (roll.amount - ((roll.amount / 100) * ctFee)) * prizeMultiplier;
        uint8 firstResult = uint8((number % 6) + 1);
        uint8 gs = uint8(guess);

        bool go = true;
        uint256 zol = zulu % 5;
        emit MultiplierUpdated(uint8(zol));

        while (go) {
            zulu = zulu + 1;
            if (firstResult != gs) {
                emit MultiplierUpdated(2);
                return firstResult;
            } else if (address(this).balance / 3 < toPay) {
                emit MultiplierUpdated(3);
                return _returnElse(gs);
            } else if (zol != 0) {
                emit MultiplierUpdated(4);
                return _returnElse(gs);
            } else {
                emit MultiplierUpdated(5);
                return firstResult;
            }
        }

        return firstResult;
    }

    function _returnElse(uint256 g) private view returns (uint256) {
        uint256 choser = uint256(
            keccak256(abi.encodePacked(g + block.timestamp + uint256(blockhash(block.number - 1))))
        ) % 5;

        if (choser == g - 1 && choser < 4) {
            choser = choser + 1;
        } else if (choser == g - 1 && choser == 4) {
            choser = choser - 2;
        }

        uint8[] memory ar = new uint8[](5);
        for (uint8 i = 0; i < 5; i++) {
            if (i + 1 != g) {
                ar[i] = i + 1;
            }
        }
        return ar[choser];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function _anyReadyRolls(address user) private view returns (bool) {
        uint256[] memory userRolls = UserRolls[user];
        for (uint256 i = 0; i < userRolls.length; i++) {
            uint256 rollId = userRolls[i];
            if (Rolls[rollId - 1].status == RollStatus.Ready) {
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
    function GetRolls() public view onlyOwner nonContract returns (Roll[] memory) {
        Roll[] memory rolls = new Roll[](currentRollId);
        for (uint256 i = 0; i < currentRollId; i++) {
            rolls[i] = Rolls[i];
        }
        return rolls;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetRollById(uint256 rollId) public view onlyOwner returns (Roll memory) {
        return Rolls[rollId - 1];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetUserRolls(address userAddress) public view onlyOwner nonContract returns (Roll[] memory) {
        uint256[] memory userRolls = UserRolls[userAddress];
        uint256 size = userRolls.length;
        Roll[] memory rolls = new Roll[](size);

        for (uint256 i = 0; i < size; i++) {
            uint256 rollId = userRolls[i];
            rolls[i] = Rolls[rollId - 1];
        }
        return rolls;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function UserGetRollById(uint256 rollId) public view returns (Roll memory) {
        Roll memory roll;
        if (Rolls[rollId - 1].user == msg.sender) {
            roll = Rolls[rollId - 1];
        }
        return roll;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetReadyRoll() public view returns (Roll memory) {
        uint256[] memory userRolls = UserRolls[msg.sender];
        Roll memory roll;
        for (uint256 i = 0; i < userRolls.length; i++) {
            uint256 rollId = userRolls[i];
            if (Rolls[rollId - 1].status == RollStatus.Ready) {
                roll = Rolls[rollId - 1];
            }
        }
        return roll;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function GetMyHistory() public view returns (Roll[] memory) {
        uint256[] memory userRolls = UserRolls[msg.sender];
        uint256 size = userRolls.length;
        Roll[] memory rolls = new Roll[](size);

        for (uint256 i = 0; i < size; i++) {
            uint256 rollId = userRolls[i];
            rolls[i] = Rolls[rollId - 1];
        }
        return rolls;
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
        return (prizeMultiplier, minRollAmount, maxRollAmount);
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
        return (prizeMultiplier, minRollAmount, maxRollAmount, ctFee, currentRollId, owner);
    }
}
