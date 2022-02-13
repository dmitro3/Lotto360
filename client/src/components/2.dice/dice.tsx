import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { DiceApiService } from "../../api/dice.api.service";
import { dice360ContractAddress } from "../../config/config";
import { Roll, RollStatus } from "../../interfaces/roll";
import { dice360ChainMethods, UserSetting } from "../../provider/chain.methods/dice360";
import { CustomToastWithLink } from "../../utilities/toastLink";
import FullScreenLoader from "../admin/shared/loader";
import DiceComponent from "./dice.component";
import DiceHeader from "./dice.header";
import DiceHistory from "./dice.history";
import DicePurchase from "./dice.purchase";
import DiceResultModal from "./dice.result.modal";
import DiceRoll from "./dice.roll";

interface DiceProps {
    address: string;
    balance: number;
    bnbPrice: number;
    web3: Web3;
}

const initialUsreSetting = {
    minBet: 0.01,
    maxBet: 0.2,
    multiplier: 4,
};

const Dice: FunctionComponent<DiceProps> = ({ address, balance, bnbPrice, web3 }) => {
    const [userSetting, setUserSetting] = useState<UserSetting>(initialUsreSetting);
    const [purchasedBet, setPurchasedBet] = useState<Roll>();
    const [modalRoll, setModalRoll] = useState<Roll>();
    const [betAmount, setBetAmount] = useState<number>(0.01);
    const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
    const [rollDiceLoading, setRollDiceLoading] = useState<boolean>(false);
    const [rollHistory, setRollHistory] = useState<Roll[]>();
    const [contractBalance, setContractBalance] = useState(0);

    useEffect(() => {
        dice360ChainMethods
            .getSettingForUser(web3)
            .then((res) => res && setUserSetting(res))
            .catch((err) => console.error("erroe getting settings:", err));

        web3.eth
            .getBalance(dice360ContractAddress)
            .then((b) => {
                const bnbBalance = Web3.utils.fromWei(b, "ether");
                setContractBalance(parseFloat(bnbBalance));
            })
            .catch((err) => console.error("error getting dice 360 balance:", err));

        getUserPurchasedRoll(
            address,
            web3,
            setPurchasedBet,
            setBetAmount,
            setUserSetting
        );

        getUserHistory(setRollHistory, address, web3);
    }, [address, web3, bnbPrice]);

    if (!userSetting) return <FullScreenLoader />;

    // constants ----------------------------------------------------------------------
    const { minBet, maxBet, multiplier } = userSetting;
    const btnSmallInfo = (
        <i className="fa-regular fa-circle-info text-secondary me-2"></i>
    );

    // functions ----------------------------------------------------------------------
    const purchaseRoll = () => {
        if (!betAmount) return;
        setPurchaseLoading(true);
        dice360ChainMethods
            .purchaseRoll(address, betAmount, web3)
            .then((res) => {
                if (res.status) {
                    toast.success("Roll purchased. time to drop your dice");
                    getUserPurchasedRoll(
                        address,
                        web3,
                        setPurchasedBet,
                        setBetAmount,
                        setUserSetting
                    );
                }
            })
            .catch((err) => {
                toast.error("Transaction failed");
                console.error("error purchasing roll:", err);
            })
            .finally(() => setPurchaseLoading(false));
    };

    const rollDice = (diceNumber: number) => {
        if (!purchasedBet) {
            toast.error("Please purchase roll first");
            return;
        }
        const { id, user } = purchasedBet;
        if (user.toLowerCase() !== address.toLowerCase()) {
            toast.error("Purchased roll not belong to you");
            return;
        }
        setRollDiceLoading(true);
        DiceApiService.dropDice(diceNumber, parseInt(id), address)
            .then(async (res) => {
                if (res && res.data && res.data.result.status) {
                    toast.success(
                        CustomToastWithLink(
                            res.data.result["transactionHash"],
                            "transaction done click link for detail"
                        )
                    );
                    getRollAgain(
                        id,
                        address,
                        web3,
                        setModalRoll,
                        setPurchasedBet,
                        setRollDiceLoading,
                        setRollHistory
                    );
                }
            })
            .catch((err) => {
                console.error("error droping dice:", err);
                setRollDiceLoading(false);
            });
    };

    return (
        <>
            <div className="dice-sec dice-page-bg main-box pb-5">
                <DiceHeader multiplier={userSetting.multiplier} />
                <h3 className="d-flex justify-content-center mb-4">
                    <span className="badge bg-light shadow">
                        {contractBalance} BNB ~ ${(contractBalance * bnbPrice).toFixed(3)}
                    </span>
                </h3>
                <div className="container pb-5">
                    <div className="d-flex justify-content-evenly flex-wrap">
                        <DicePurchase
                            alreadyPurchased={purchasedBet !== undefined}
                            balance={balance}
                            betAmount={betAmount}
                            btnSmallInfo={btnSmallInfo}
                            buttonLoading={purchaseLoading}
                            maxBet={maxBet}
                            minBet={minBet}
                            multiplier={multiplier}
                            purchaseRoll={purchaseRoll}
                            setBetAmount={setBetAmount}
                        />

                        <DiceRoll
                            alreadyPurchased={purchasedBet !== undefined}
                            btnSmallInfo={btnSmallInfo}
                            buttonLoading={rollDiceLoading}
                            rollDice={rollDice}
                        />
                    </div>

                    {rollHistory && rollHistory.length > 0 && (
                        <div>
                            <h3 className="d-flex justify-content-center mt-5 p-3">
                                <span className="badge bg-light shadow">
                                    Your History
                                </span>
                            </h3>
                            <div className="bg-white rounded overflow-hidden shadow">
                                <DiceHistory
                                    data={rollHistory}
                                    setModalRoll={setModalRoll}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <DiceComponent diceNumber={rollDiceLoading ? "0" : modalRoll?.result} />
            </div>

            {modalRoll && (
                <DiceResultModal
                    roll={modalRoll}
                    setShowModal={setModalRoll}
                    showModal={!!modalRoll}
                />
            )}
        </>
    );
};

export default Dice;

function getUserPurchasedRoll(
    address: string,
    web3: Web3,
    setPurchasedBet: Dispatch<React.SetStateAction<Roll | undefined>>,
    setBetAmount: Dispatch<React.SetStateAction<number>>,
    setUserSetting: Dispatch<React.SetStateAction<UserSetting>>
) {
    dice360ChainMethods
        .userReadyRoll(address, web3)
        .then((res: Roll) => {
            if (res.status === RollStatus.Ready && parseInt(res.id)) {
                setPurchasedBet(res);
                setBetAmount(parseFloat(Web3.utils.fromWei(res.amount, "ether")));
                setUserSetting((u) => {
                    u.multiplier = parseInt(res.multiplier);
                    return u;
                });
            } else setPurchasedBet(undefined);
        })
        .catch((err) => console.error("erroe getting ready roll:", err));
}

function getUserHistory(setUserRolls: Dispatch<any>, address: string, web3: Web3) {
    dice360ChainMethods
        .userHistory(address, web3)
        .then((res) => setUserRolls(res))
        .catch((err) => console.error("error getting history:", err));
}

function getRollAgain(
    id: string,
    address: string,
    web3: Web3,
    setModalRoll: Function,
    setPurchasedBet: Function,
    setRollDiceLoading: Function,
    setRollHistory: Dispatch<any>
) {
    dice360ChainMethods
        .getRollById(id, address, web3)
        .then((roll: Roll) => {
            if (roll.guess === roll.result && roll.result === "0") {
                getRollAgain(
                    id,
                    address,
                    web3,
                    setModalRoll,
                    setPurchasedBet,
                    setRollDiceLoading,
                    setRollHistory
                );
            } else {
                setModalRoll(roll);
                setPurchasedBet(undefined);
                getUserHistory(setRollHistory, address, web3);
                setRollDiceLoading(false);
            }
        })
        .catch((err) => console.error(err));
}

export const getDiceClass = (r: Roll) =>
    r.result === r.guess ? "text-success" : "text-danger";
