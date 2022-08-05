/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { load } from "cheerio";
import { FunctionComponent, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import Web3 from "web3";
import { signalContractAddress } from "../../../config/config";
import logo from "../../../content/img/logohead.png";
import { chainMethods } from "../../../provider/chain.methods";
import { StateModel } from "../../../reducer/reducer";
import { isAddressValid } from "../../../utils/string";
import Particles from "../admin/particles";

interface MainBannerProps {
    state: StateModel;
    updateInfo: () => void;
}

const MainBanner: FunctionComponent<MainBannerProps> = ({ state, updateInfo }) => {
    const [telegramId, setTelegramId] = useState("");
    const [refferrer, setRefferrer] = useState("");
    const [loading, setLoading] = useState(false);
    const [txNumbers, setTxNumbers] = useState(143);
    const queryStrings = new URLSearchParams(window.location.search).get("ref");

    useEffect(() => {
        const refParam = queryStrings;
        setRefferrer(refParam ? refParam : "");

        const url = `https://bscscan.com/address/${signalContractAddress}`;
        axios
            .get(url)
            .then((response) => {
                const $ = load(response.data);
                const txNumbers = $("#transactions>.mb-3>.mb-2>a").text();
                const number = Number(txNumbers);
                setTxNumbers(number);
            })
            .catch((err) => {
                console.error("terk", err);
            });
    }, []);

    const { address, referrerShare, subscriptionFee, totalUsers, userBalance, web3 } = state;

    const handlePurchase = () => {
        if (!address || !web3) return;
        if (refferrer && !isAddressValid(refferrer)) {
            toast.error("Invalid referrer address");
            return;
        }
        if (!telegramId) {
            toast.warning("Please enter your telegram id");
            return;
        }

        setLoading(true);
        chainMethods
            .purchaseMembership(address, telegramId, refferrer, subscriptionFee, web3)
            .then((res) => {
                if (res.status) {
                    toast.success("purchased successfully, we will add you soon, be patient");
                    updateInfo();
                }
            })
            .catch((err) => {
                toast.error("Transaction failed");
                console.error("error purchasing membership:", err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="hero_single version_3">
            <Particles />

            <div className="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.3)">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-7 col-lg-10">
                            <img src={logo} alt="logo" height="200" className="dark" />
                            <h1>Spot, margin, hold</h1>
                            <p>trade with our signals on your platform of choice</p>
                            <div>
                                <div className="row g-0 custom-search-input mx-auto">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter referral wallet address (optional)"
                                            value={refferrer}
                                            disabled={loading}
                                            onChange={(e) => setRefferrer(e.currentTarget.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row g-0 custom-search-input mx-auto">
                                    <div className="col-md-9">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter telegram id: like @mytelegramid"
                                                value={telegramId}
                                                disabled={loading}
                                                onChange={(e) => setTelegramId(e.currentTarget.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <button
                                            className="btn btn-purchase d-flex align-items-center justify-content-center"
                                            disabled={loading}
                                            onClick={() => handlePurchase()}
                                        >
                                            {loading ? <BounceLoader color="#fff" size={30} /> : "Purchase"}
                                        </button>
                                    </div>
                                </div>

                                <div className="search_trends ">
                                    <ul className="mt-0">
                                        <li>
                                            <h6 className="text-warning mb-3">Your balance: {userBalance} BNB</h6>
                                            <span>Make sure to read the rules before paying for a membership.</span>
                                            <br />
                                            <span>
                                                Purchase premium membership access to our private telegram channel with{" "}
                                                {Web3.utils.fromWei(subscriptionFee)} BNB.
                                            </span>
                                            <br />
                                            <span>
                                                By entering the referral wallet address referrer receive {referrerShare}
                                                % of registering fee (
                                                {(Number(Web3.utils.fromWei(subscriptionFee)) * referrerShare) / 100}{" "}
                                                BNB)
                                            </span>
                                            <br />
                                            <h4 className="mt-3 text-warning">
                                                Total subscriptions: {Number(totalUsers) + Number(txNumbers)}
                                            </h4>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wave hero"></div>
        </div>
    );
};

export default MainBanner;
