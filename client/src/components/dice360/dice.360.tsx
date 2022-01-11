import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";

import { dice360ChainMethods, UserSetting } from "../../provider/dice360.chain.methods";
import { DiceApiService } from "../../api/dice.api.service";
import { Roll, RollStatus } from "../../interfaces/roll";
import FullScreenLoader from "../admin/shared/loader";
import DiceResultModal from "./dice.result.modal";
import DicePurchase from "./dice.purchase";
import DiceHeader from "./dice.header";
import DiceRoll from "./dice.roll";
import { Table } from "react-bootstrap";
import moment from "moment";

interface Dice360Props {
    address: string;
    balance: number;
    web3: Web3;
}

const initialUsreSetting = {
    minBet: 0.01,
    maxBet: 0.2,
    multiplier: 4,
};

const Dice360: FunctionComponent<Dice360Props> = ({ address, balance, web3 }) => {
    const [userSetting, setUserSetting] = useState<UserSetting>(initialUsreSetting);
    const [purchasedBet, setPurchasedBet] = useState<Roll>();
    const [modalRoll, setModalRoll] = useState<Roll>();
    const [betAmount, setBetAmount] = useState<number>(0.01);
    const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
    const [rollDiceLoading, setRollDiceLoading] = useState<boolean>(false);
    const [rollHistory, setRollHistory] = useState<Roll[]>();

    useEffect(() => {
        dice360ChainMethods
            .getSettingForUser(web3)
            .then((res) => res && setUserSetting(res))
            .catch((err) => console.error("erroe getting settings:", err));

        getUserPurchasedRoll(
            address,
            web3,
            setPurchasedBet,
            setBetAmount,
            setUserSetting
        );

        getUserHistory(setRollHistory, address, web3);
    }, [address, web3]);

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
        console.info(id);
        if (user.toLowerCase() !== address.toLowerCase()) {
            toast.error("Purchased roll not belong to you");
            return;
        }
        setRollDiceLoading(true);
        DiceApiService.dropDice(diceNumber, parseInt(id), address)
            .then(async (res) => {
                if (res && res.data && res.data.result.status) {
                    const roll = await dice360ChainMethods.getRollById(id, address, web3);
                    setModalRoll(roll);
                    setPurchasedBet(undefined);
                    getUserHistory(setRollHistory, address, web3);
                }
            })
            .catch((err) => console.error("error droping dice:", err))
            .finally(() => setRollDiceLoading(false));
    };

    return (
        <>
            <div className="dice-sec bg3 main-box pb-5">
                <div className="container pb-5">
                    <DiceHeader multiplier={multiplier} />

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
                            <h4 className="text-center fw-bold mt-5">Your History</h4>
                            <div className="bg-white rounded overflow-hidden">
                                <Table className="mb-0" striped bordered hover responsive>
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#Id</th>
                                            <th>Amount</th>
                                            <th>Drop time</th>
                                            <th>Guess</th>
                                            <th>Result</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rollHistory.map((r, i) => (
                                            <tr key={i}>
                                                <td>{r.id}</td>
                                                <td>
                                                    {Web3.utils.fromWei(
                                                        r.amount,
                                                        "ether"
                                                    )}
                                                </td>
                                                <td>
                                                    {moment(
                                                        parseInt(r.rollTime) * 1000
                                                    ).format("DD/MM/YYYY, h:mm a")}
                                                </td>
                                                <td>{r.guess}</td>
                                                <td>{r.result}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => setModalRoll(r)}
                                                    >
                                                        detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>
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

export default Dice360;

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
