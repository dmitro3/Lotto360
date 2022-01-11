import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";

import { dice360ChainMethods, UserSetting } from "../../provider/dice360.chain.methods";
import { DiceApiService } from "../../api/dice.api.service";
import { Roll, RollStatus } from "../../interfaces/roll";
import FullScreenLoader from "../admin/shared/loader";
import DicePurchase from "./dice.purchase";
import DiceHeader from "./dice.header";
import DiceRoll from "./dice.roll";

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
    const [betAmount, setBetAmount] = useState<number>(0.01);

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
            });
    };

    const rollDice = (diceNumber: number) => {
        if (!purchasedBet) {
            toast.error("Please purchase roll first");
            return;
        }
        const { id, user } = purchasedBet;
        if (user !== address) {
            toast.error("Purchased roll not belong to you");
            return;
        }
        DiceApiService.dropDice(diceNumber, parseInt(id), address)
            .then((res) => console.info(res))
            .catch((err) => console.error("error droping dice:", err));
    };

    return (
        <div className="dice-sec bg5 main-box">
            <div className="container">
                <DiceHeader multiplier={multiplier} />

                <div className="d-flex justify-content-evenly flex-wrap">
                    <DicePurchase
                        alreadyPurchased={purchasedBet !== undefined}
                        balance={balance}
                        betAmount={betAmount}
                        btnSmallInfo={btnSmallInfo}
                        maxBet={maxBet}
                        minBet={minBet}
                        multiplier={multiplier}
                        purchaseRoll={purchaseRoll}
                        setBetAmount={setBetAmount}
                    />

                    <DiceRoll
                        alreadyPurchased={purchasedBet !== undefined}
                        btnSmallInfo={btnSmallInfo}
                        rollDice={rollDice}
                    />
                </div>
            </div>
        </div>
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
