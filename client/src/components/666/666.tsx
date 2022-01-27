import moment from "moment";
import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Web3 from "web3";
import { BeastApiService } from "../../api/beast.api.service";
import { Spin, SpinStatus } from "../../interfaces/spin";
import { beastChainMethods, UserSetting } from "../../provider/chain.methods/beast";
import FullScreenLoader from "../admin/shared/loader";
import BeastHeader from "./666.header";
import BeastPurchase from "./666.purchase";
import BeastResultModal from "./666.result.modal";
import BeastSpin from "./666.spin";

interface BeastProps {
    address: string;
    balance: number;
    web3: Web3;
}

const initialUsreSetting = {
    minBet: 0.01,
    maxBet: 0.2,
    multiplier: 20,
};

const Beast: FunctionComponent<BeastProps> = ({ address, balance, web3 }) => {
    const [userSetting, setUserSetting] = useState<UserSetting>(initialUsreSetting);
    const [purchasedBet, setPurchasedBet] = useState<Spin>();
    const [modalSpin, setModalSpin] = useState<Spin>();
    const [betAmount, setBetAmount] = useState<number>(0.01);
    const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
    const [spinBeastLoading, setSpinBeastLoading] = useState<boolean>(false);
    const [spinAutoPlay, setSpinAutoPlay] = useState<boolean>(false);
    const [spinHistory, setSpinHistory] = useState<Spin[]>();
    const [spinResult, setSpinResult] = useState("");

    useEffect(() => {
        beastChainMethods
            .getSettingForUser(web3)
            .then((res) => res && setUserSetting(res))
            .catch((err) => console.error("erroe getting settings:", err));

        getUserPurchasedSpin(
            address,
            web3,
            setPurchasedBet,
            setBetAmount,
            setUserSetting
        );

        getUserHistory(setSpinHistory, address, web3);
    }, [address, web3]);

    if (!userSetting) return <FullScreenLoader />;

    // constants ----------------------------------------------------------------------
    const { minBet, maxBet, multiplier } = userSetting;
    const btnSmallInfo = (
        <i className="fa-regular fa-circle-info text-secondary me-2"></i>
    );

    // functions ----------------------------------------------------------------------
    const purchaseSpin = () => {
        if (!betAmount) return;
        setPurchaseLoading(true);
        beastChainMethods
            .purchaseSpin(address, betAmount, web3)
            .then((res) => {
                if (res.status) {
                    toast.success("Spin purchased, time to spin.");
                    getUserPurchasedSpin(
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
                console.error("error purchasing spin:", err);
            })
            .finally(() => setPurchaseLoading(false));
    };

    const spinSlot = () => {
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
        setSpinBeastLoading(true);
        BeastApiService.spinSlot(parseInt(id), address)
            .then(async (res) => {
                if (res && res.data && res.data.result.status) {
                    const spin = await beastChainMethods.getSpinById(id, address, web3);
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
            .catch((err) => {
                console.error("error droping beast:", err);
                setSpinAutoPlay(false);
            })
            .finally(() => setSpinBeastLoading(false));
    };

    return (
        <>
            <div className="beast-sec bg6 main-box beastbox pb-5">
                <div className="container pb-5">
                    <BeastHeader multiplier={multiplier} />

                    <div className="d-flex justify-content-evenly flex-wrap">
                        <BeastPurchase
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

                        <BeastSpin
                            alreadyPurchased={purchasedBet !== undefined}
                            autoPlay={spinAutoPlay}
                            btnSmallInfo={btnSmallInfo}
                            buttonLoading={spinBeastLoading}
                            spinSlot={spinSlot}
                            spinResult={spinResult}
                        />
                    </div>

                    {spinHistory && spinHistory.length > 0 && (
                        <div>
                            <h4 className="text-center fw-bold mt-5">Your History</h4>
                            <div className="bg-white rounded overflow-hidden">
                                <Table className="mb-0" striped bordered hover responsive>
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#Id</th>
                                            <th>Amount</th>
                                            <th>Drop time</th>
                                            <th>Result</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {spinHistory.map((r, i) => (
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
                                                        parseInt(r.spinTime) * 1000
                                                    ).format("DD/MM/YYYY, h:mm a")}
                                                </td>
                                                <td>{r.result.substring(1)}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => setModalSpin(r)}
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

            {modalSpin && (
                <BeastResultModal
                    spin={modalSpin}
                    setShowModal={setModalSpin}
                    showModal={!!modalSpin}
                />
            )}
        </>
    );
};

export default Beast;

function getUserPurchasedSpin(
    address: string,
    web3: Web3,
    setPurchasedBet: Dispatch<React.SetStateAction<Spin | undefined>>,
    setBetAmount: Dispatch<React.SetStateAction<number>>,
    setUserSetting: Dispatch<React.SetStateAction<UserSetting>>
) {
    beastChainMethods
        .userReadySpin(address, web3)
        .then((res: Spin) => {
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
    beastChainMethods
        .userHistory(address, web3)
        .then((res) => setUserSpins(res))
        .catch((err) => console.error("error getting history:", err));
}
