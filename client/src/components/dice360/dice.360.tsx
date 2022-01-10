import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { Roll, RollStatus } from "../../interfaces/roll";
import { dice360ChainMethods, UserSetting } from "../../provider/dice360.chain.methods";
import FullScreenLoader from "../admin/shared/loader";

interface Dice360Props {
    address: string;
    balance: number;
    web3: Web3;
}
let diceNumber: number | undefined;

const Dice360: FunctionComponent<Dice360Props> = ({ address, balance, web3 }) => {
    const [choosedDice, setChoosedDice] = useState<number | undefined>();
    const [betAmount, setBetAmount] = useState<number>(0.01);
    const [userSetting, setUserSetting] = useState<UserSetting>();
    const [alreadyPurchased, setAlreadyPurchased] = useState<boolean>(false);

    useEffect(() => {
        dice360ChainMethods
            .getSettingForUser(web3)
            .then((res) => res && setUserSetting(res))
            .catch((err) => console.error("erroe getting settings:", err));

        dice360ChainMethods
            .userReadyRoll(address, web3)
            .then((res: Roll) => {
                if (res.status === RollStatus.Ready && parseInt(res.id)) {
                    setAlreadyPurchased(true);
                    setBetAmount(parseFloat(Web3.utils.fromWei(res.amount, "ether")));
                    if (userSetting)
                        setUserSetting({
                            ...userSetting,
                            multiplier: parseInt(res.multiplier),
                        });
                    else {
                        setUserSetting({
                            minBet: 0.01,
                            maxBet: 0.2,
                            multiplier: parseInt(res.multiplier),
                        });
                    }
                } else setAlreadyPurchased(false);
            })
            .catch((err) => console.error("erroe getting ready roll:", err));
    }, [address, web3]);

    diceNumber = choosedDice;
    const diceClass = "fa-solid pointer fs-1";
    const btnSmallInfo = (
        <i className="fa-regular fa-circle-info text-secondary me-2"></i>
    );

    const handleDiceClick = (number: number) => {
        choosedDice === number ? setChoosedDice(undefined) : setChoosedDice(number);
    };

    const purchaseRoll = () => {
        if (!betAmount) return;
        dice360ChainMethods
            .purchaseRoll(address, betAmount, web3)
            .then((res) => {
                if (res.status) {
                    setAlreadyPurchased(true);
                    toast.success("Roll purchased. time to drop your dice");
                }
            })
            .catch((err) => {
                toast.error("Transaction failed");
                console.error("error purchasing roll:", err);
            });
    };

    const getButtonText = () => {
        if (!alreadyPurchased) return "first purchase";
        else if (!choosedDice) return "choose number";
        else return "drop";
    };

    if (!userSetting) return <FullScreenLoader />;
    const { minBet, maxBet, multiplier } = userSetting;

    return (
        <div className="dice-sec bg3">
            <div className="container">
                <h1 className="pt-5 text-center big-title">Dice</h1>
                <p className="text-center fs-5 fw-bold mb-5">
                    <span>
                        <i className="fa-solid fa-circle-1 me-2"></i>Purchase roll
                    </span>
                    <span className="mx-3">
                        <i className="fa-solid fa-circle-2 me-2"></i>Drop dice
                    </span>
                    <span>
                        <i className="fa-solid fa-circle-3 me-2 opacity-25"></i>Get x
                        {multiplier} prize
                    </span>
                </p>

                <div className="d-flex justify-content-evenly flex-wrap">
                    <div
                        className={`purchase-box rounded bg-white shadow p-4 ${
                            alreadyPurchased ? "opacity-50" : ""
                        }`}
                    >
                        <h4 className="fw-bold mb-4">
                            <i className="fa-regular fa-circle-1 me-2"></i>
                            Purchase roll
                        </h4>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Your balance</span>
                            <span className="fw-bold">{balance} BNB</span>
                        </div>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                disabled={alreadyPurchased}
                                type="number"
                                placeholder="enter bet amount"
                                value={betAmount}
                                onChange={(e) => {
                                    if (!e.target.value) setBetAmount(0);
                                    else {
                                        const val = parseFloat(e.target.value);
                                        setBetAmount(val);
                                    }
                                }}
                            />
                        </div>
                        <p className="mb-0">
                            {btnSmallInfo}
                            Bet range:
                            <span className="fw-bold ms-2">
                                {minBet} to {maxBet} BNB
                            </span>
                        </p>
                        <p>
                            {btnSmallInfo}
                            Win amount x{multiplier}:
                            <span className="fw-bold ms-2">
                                {betAmount * multiplier || 0} BNB
                            </span>
                        </p>
                        <button
                            type="button"
                            className="btn btn-success w-100 mt-3"
                            disabled={
                                !(betAmount >= minBet && betAmount <= maxBet) ||
                                alreadyPurchased
                            }
                            onClick={() => purchaseRoll()}
                        >
                            {alreadyPurchased
                                ? "already purchased roll"
                                : "purchase roll"}
                        </button>
                    </div>
                    <div
                        className={`drop-box rounded bg-white shadow p-4 ${
                            !alreadyPurchased ? "opacity-50" : ""
                        }`}
                    >
                        <h4 className="fw-bold mb-4">
                            <i className="fa-regular fa-circle-2 me-2"></i>
                            Drop roll
                        </h4>
                        <p>
                            {btnSmallInfo}
                            Choose a number then hit Drop button
                        </p>
                        <div className="d-flex justify-content-around my-3 mt-4">
                            {[1, 2, 3, 4, 5, 6].map((num, i) => (
                                <i
                                    key={i}
                                    onClick={() => handleDiceClick(num)}
                                    className={`${diceClass} fa-dice-${numberToWord(
                                        num
                                    )} ${active(num)}`}
                                ></i>
                            ))}
                        </div>
                        <button
                            disabled={!choosedDice || !alreadyPurchased}
                            type="button"
                            className="btn btn-success w-100 mt-3"
                        >
                            {getButtonText()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dice360;

const active = (number: number) => (diceNumber === number ? "active shadow" : "");
const numberToWord = (n: number) => {
    if (n === 1) return "one";
    else if (n === 2) return "two";
    else if (n === 3) return "three";
    else if (n === 4) return "four";
    else if (n === 5) return "five";
    else return "six";
};
