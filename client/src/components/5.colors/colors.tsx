import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { ColorsApiService } from "../../api/colors.api.service";
import { colorsContractAddress } from "../../config/config";
import { ColorsSpin as ISpin, SpinStatus } from "../../interfaces/spin";
import { UserSetting } from "../../provider/chain.methods/beast";
import { colorsChainMethods } from "../../provider/chain.methods/colors";
import { CustomToastWithLink } from "../../utilities/toastLink";
import FullScreenLoader from "../admin/shared/loader";
import ColorsHeader from "./colors.header";
import ColorsHistory from "./colors.history";
import ColorsPurchase from "./colors.purchase";
import ColorsResultModal from "./colors.result.modal";
import ColorsSpin from "./colors.spin";

interface ColorsProps {
    address: string;
    balance: number;
    bnbPrice: number;
    web3: Web3;
}

interface IGetSpin {
    id: string;
    address: string;
    web3: Web3;
    setSpinHistory: Dispatch<any>;
    setSpinResult: Function;
    setPurchasedBet: Function;
    setSpinAutoPlay: Function;
    setModalSpin: Function;
}

const initialUsreSetting = {
    minBet: 0.01,
    maxBet: 0.2,
    multiplier: 20,
};

const Colors: FunctionComponent<ColorsProps> = ({ address, balance, bnbPrice, web3 }) => {
    const [betAmount, setBetAmount] = useState<number>(0.01);
    const [contractBalance, setContractBalance] = useState(0);
    const [choosedcolor, setChoosedColor] = useState("0");
    const [modalSpin, setModalSpin] = useState<ISpin>();
    const [purchasedBet, setPurchasedBet] = useState<ISpin>();
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [spinAutoPlay, setSpinAutoPlay] = useState(false);
    const [spinHistory, setSpinHistory] = useState<ISpin[]>();
    const [spinResult, setSpinResult] = useState("");
    const [userSetting, setUserSetting] = useState<UserSetting>(initialUsreSetting);

    useEffect(() => {
        colorsChainMethods
            .getSettingForUser(web3)
            .then((res) => res && setUserSetting(res))
            .catch((err) => console.error("erroe getting settings:", err));

        web3.eth
            .getBalance(colorsContractAddress)
            .then((b) => {
                const bnbBalance = Web3.utils.fromWei(b, "ether");
                setContractBalance(parseFloat(bnbBalance));
            })
            .catch((err) => console.error("error getting dice 360 balance:", err));

        getUserPurchasedSpin(address, web3, setPurchasedBet, setBetAmount, setUserSetting);

        getUserHistory(setSpinHistory, address, web3);
    }, [address, bnbPrice, web3]);

    if (!userSetting) return <FullScreenLoader />;

    // constants ----------------------------------------------------------------------
    const { minBet, maxBet, multiplier } = userSetting;
    const btnSmallInfo = <i className="fa-regular fa-circle-info text-secondary me-2"></i>;

    // functions ----------------------------------------------------------------------
    const purchaseSpin = () => {
        if (!betAmount) return;
        setPurchaseLoading(true);
        colorsChainMethods
            .purchaseSpin(address, betAmount, web3)
            .then((res) => {
                if (res.status) {
                    toast.success("Spin purchased, time to spin.");
                    getUserPurchasedSpin(address, web3, setPurchasedBet, setBetAmount, setUserSetting);
                }
            })
            .catch((err) => {
                toast.error("Transaction failed");
                console.error("error purchasing spin:", err);
            })
            .finally(() => setPurchaseLoading(false));
    };

    const handleSpin = () => {
        setSpinAutoPlay(true);
        if (!purchasedBet) {
            toast.error("Please purchase spin first");
            return;
        }
        const { id, user } = purchasedBet;
        if (user.toLowerCase() !== address.toLowerCase()) {
            toast.error("Purchased spin not belong to you");
            return;
        }
        setSpinAutoPlay(true);
        const numericcolors = 1000000 + Number(choosedcolor);
        ColorsApiService.spinSlot(parseInt(id), address, numericcolors)
            .then(async (res) => {
                if (res && res.data && res.data.result.status) {
                    toast.success(
                        CustomToastWithLink(
                            res.data.result["transactionHash"],
                            "transaction done click link for detail"
                        )
                    );
                    getSpinById({
                        id,
                        address,
                        web3,
                        setSpinHistory,
                        setSpinResult,
                        setPurchasedBet,
                        setSpinAutoPlay,
                        setModalSpin,
                    });
                }
            })
            .catch((err) => {
                console.error("error droping colors:", err);
                setSpinAutoPlay(false);
            });
    };

    return (
        <>
            <div className={`colors-sec bg-fruit main-box colorsbox pb-5 ${spinAutoPlay ? "bg-colors-animate" : ""}`}>
                <div className="container pb-5">
                    <ColorsHeader multiplier={multiplier} />
                    <h3 className="d-flex justify-content-center mb-4">
                        <span className="badge bg-black shadow">
                            {contractBalance} BNB ~ ${(contractBalance * bnbPrice).toFixed(3)}
                        </span>
                    </h3>
                    <div className="d-flex justify-content-evenly flex-wrap">
                        <ColorsPurchase
                            alreadyPurchased={purchasedBet !== undefined}
                            balance={balance}
                            betAmount={betAmount}
                            btnSmallInfo={btnSmallInfo}
                            buttonLoading={purchaseLoading}
                            maxBet={maxBet}
                            minBet={minBet}
                            multiplier={multiplier}
                            purchaseSpin={purchaseSpin}
                            setBetAmount={setBetAmount}
                        />

                        <ColorsSpin
                            alreadyPurchased={purchasedBet !== undefined}
                            autoPlay={spinAutoPlay}
                            choosedColor={choosedcolor}
                            setChoosedcolor={setChoosedColor}
                            btnSmallInfo={btnSmallInfo}
                            handleSpin={handleSpin}
                            spinResult={spinResult}
                        />
                    </div>

                    {spinHistory && spinHistory.length > 0 && (
                        <div>
                            <h3 className="d-flex justify-content-center mt-5 p-3">
                                <span className="badge bg-black shadow">Your History</span>
                            </h3>
                            <div className="bg-white shadow rounded overflow-hidden">
                                <ColorsHistory data={spinHistory} setModalSpin={setModalSpin} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {modalSpin && <ColorsResultModal spin={modalSpin} setShowModal={setModalSpin} showModal={!!modalSpin} />}
        </>
    );
};

export default Colors;

const getSpinById = ({
    id,
    address,
    web3,
    setSpinHistory,
    setSpinResult,
    setPurchasedBet,
    setSpinAutoPlay,
    setModalSpin,
}: IGetSpin) => {
    colorsChainMethods
        .getSpinById(id, address, web3)
        .then((spin: ISpin) => {
            if (spin.result === "0") {
                getSpinById({
                    id,
                    address,
                    web3,
                    setSpinHistory,
                    setSpinResult,
                    setPurchasedBet,
                    setSpinAutoPlay,
                    setModalSpin,
                });
            } else {
                getUserHistory(setSpinHistory, address, web3);
                setSpinResult(spin.result);
                setTimeout(() => {
                    setPurchasedBet(undefined);
                    setSpinAutoPlay(false);
                    setModalSpin(spin);
                    setSpinResult("");
                }, 4000);
            }
        })
        .catch((err) => console.error(err));
};

function getUserPurchasedSpin(
    address: string,
    web3: Web3,
    setPurchasedBet: Dispatch<React.SetStateAction<ISpin | undefined>>,
    setBetAmount: Dispatch<React.SetStateAction<number>>,
    setUserSetting: Dispatch<React.SetStateAction<UserSetting>>
) {
    colorsChainMethods
        .userReadySpin(address, web3)
        .then((res: ISpin) => {
            if (res.status === SpinStatus.Ready && parseInt(res.id)) {
                setPurchasedBet(res);
                setBetAmount(parseFloat(Web3.utils.fromWei(res.amount, "ether")));
                setUserSetting((u) => {
                    u.multiplier = parseInt(res.multiplier);
                    return u;
                });
            } else setPurchasedBet(undefined);
        })
        .catch((err) => console.error("erroe getting ready spin:", err));
}

function getUserHistory(setUserSpins: Dispatch<any>, address: string, web3: Web3) {
    colorsChainMethods
        .userHistory(address, web3)
        .then((res) => setUserSpins(res))
        .catch((err) => console.error("error getting history:", err));
}
