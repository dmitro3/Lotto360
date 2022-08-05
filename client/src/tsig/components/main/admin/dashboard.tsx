/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { chainMethods } from "../../../provider/chain.methods";
import { SubscriptionModel, WinnerModel } from "../../../reducer/reducer";
import { initialAdmin } from "../../../start/initialAdmin";
import {
    getLastSubscriptionRecord,
    saveLastSubscriptionRecord,
} from "../../../utils/local.storage";
import SubscriptionTable from "../shared/subscription.table";
import Banner from "./banner";
import InputSetting from "./input.setting";
import Transfer from "./transfer";
import Winners from "./winners";

interface DashboardProps {
    address?: string;
    web3?: Web3;
    bnbPrice: number;
    refShare: number;
    currentPrize: string;
    regFee: string;
}

const Dashboard: FunctionComponent<DashboardProps> = ({
    address,
    bnbPrice,
    refShare,
    regFee,
    currentPrize,
    web3,
}) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [lastSubscription, setLastSubscription] = useState("");
    const [balance, setBalance] = useState("0");
    const [users, setUsers] = useState("0");
    const [refs, setRefs] = useState("0");
    const [accounts, setAccounts] = useState<SubscriptionModel[]>([]);
    const [winners, setWinners] = useState<WinnerModel[]>([]);

    useEffect(() => {
        setLastSubscription(getLastSubscriptionRecord());
        if (!web3 || !address) return;
        initialAdmin(
            address,
            setAccounts,
            setBalance,
            setRefs,
            setWinners,
            setUsers,
            web3
        );
        setInterval(
            () =>
                initialAdmin(
                    address,
                    setAccounts,
                    setBalance,
                    setRefs,
                    setWinners,
                    setUsers,
                    web3
                ),
            10000
        );
    }, [address, web3]);

    if (!web3 || !address) return <></>;

    const setRegisterationFee = (fee: string) => {
        setLoading(true);
        chainMethods
            .setSubscriptionFee(address, fee, web3)
            .then((res) => res.status && toast.success("Subscription fee changed"))
            .catch((err) => console.error("Subscription fee change", err))
            .finally(() => setLoading(false));
    };
    const setReferrerShare = (share: string) => {
        setLoading(true);
        chainMethods
            .setReferrerShare(address, Number(share), web3)
            .then((res) => res.status && toast.success("Referrer share changed"))
            .catch((err) => console.error("Referrer share change", err))
            .finally(() => setLoading(false));
    };
    const changeOwnership = (owner: string) => {
        setLoading(true);
        chainMethods
            .changeOwner(address, owner, web3)
            .then((res) => res.status && toast.success("Owner changed"))
            .catch((err) => console.error("Owner change", err))
            .finally(() => setLoading(false));
    };
    const transferTokens = (reciever: string, amount: string) => {
        setLoading(true);
        chainMethods
            .transferBNB(address, reciever, amount, web3)
            .then((res) => res.status && toast.success("Transfered"))
            .catch((err) => console.error("Transfer", err))
            .finally(() => setLoading(false));
    };
    const setNewPrize = (amount: string) => {
        setLoading(true);
        chainMethods
            .setPrizeAmount(address, amount, web3)
            .then((res) => res.status && toast.success("Prize amount changed"))
            .catch((err) => console.error("Prize amount set", err))
            .finally(() => setLoading(false));
    };
    const onClickId = (value: number) => {
        if (value.toString() !== lastSubscription) setLastSubscription(value.toString());
        else setLastSubscription("");
        saveLastSubscriptionRecord(value.toString());
    };

    let data = [...accounts];
    if (search) {
        data = data.filter(
            (s) =>
                s.telegramId.toLowerCase().includes(search.toLowerCase()) ||
                s.wallet.toLowerCase().includes(search.toLowerCase())
        );
    }
    data.reverse();

    return (
        <main>
            <Banner
                balance={balance}
                bnbPrice={bnbPrice}
                refs={refs}
                users={users}
                winners={winners.length}
            />

            <div className="container margin_90_90">
                <div className="main_title center">
                    <span>
                        <em></em>
                    </span>

                    <h2 className="mb-5">Settings</h2>

                    <InputSetting
                        buttonTitle="Register fee"
                        loading={loading}
                        onClick={setRegisterationFee}
                        placeHolder="Registration fee"
                        value={Web3.utils.fromWei(regFee)}
                    />
                    <InputSetting
                        buttonTitle="Referrer share"
                        loading={loading}
                        onClick={setReferrerShare}
                        placeHolder="Referrer share"
                        value={refShare.toString()}
                    />
                    <InputSetting
                        buttonTitle="Owner address"
                        loading={loading}
                        onClick={changeOwnership}
                        placeHolder="Change owner"
                        value={address}
                    />
                    <InputSetting
                        buttonTitle="Set prize"
                        loading={loading}
                        onClick={setNewPrize}
                        placeHolder="Enter new amount of prize (BNB)"
                        value={currentPrize}
                    />
                    <div className="mt-3"></div>
                    <Transfer loading={loading} onClick={transferTokens} />

                    {winners.length > 0 && <Winners winners={winners} />}

                    <hr />

                    <span>
                        <em></em>
                    </span>
                    <h2 className="mb-5">Accounts</h2>

                    <div>
                        <div className="col-md-6 col-lg-5">
                            <div className="form-group mb-2">
                                <input
                                    className="form-control bg-white text-dark"
                                    type="text"
                                    placeholder="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.currentTarget.value)}
                                />
                            </div>
                        </div>
                        <div className="rounded overflow-hidden border border-2 border-color-1">
                            <SubscriptionTable
                                onClick={onClickId}
                                lastSubscription={lastSubscription}
                                userSubscription={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
