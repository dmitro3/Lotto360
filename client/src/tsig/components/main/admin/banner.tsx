import { FunctionComponent } from "react";
import Particles from "./particles";

interface BannerMainProps {
    balance: string;
    bnbPrice: number;
    refs: string;
    users: string;
    winners: number;
}

const Banner: FunctionComponent<BannerMainProps> = ({
    balance,
    bnbPrice,
    refs,
    users,
    winners,
}) => {
    return (
        <div className="hero_single version_3">
            <Particles />
            <div
                className="opacity-mask"
                data-opacity-mask="rgba(0, 0, 0, 0.3)"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <h1>Dashboard</h1>
                        <div className="count slide-animated three is-transitioned col-xl-7 col-lg-10">
                            <ul>
                                <li>
                                    <h6>Balance</h6>
                                    {balance} BNB ~ $
                                    {(Number(balance) * bnbPrice).toFixed(0)}
                                </li>
                                <li>
                                    <h6>Users</h6>
                                    {users}
                                </li>
                                <li>
                                    <h6>Refs</h6>
                                    {refs}
                                </li>
                                <li>
                                    <h6>Winners</h6>
                                    {winners}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wave hero"></div>
        </div>
    );
};

export default Banner;
