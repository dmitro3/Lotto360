import { BigNumber } from "ethers";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Web3 from "web3";
import {
    beastContractAddress,
    dice360ContractAddress,
    fruitContractAddress,
} from "../../../config/config";
import { BN, weiToEther } from "../../../utilities/ethers";
import Spin from "../1.666/spin";
import SpinSettings from "../1.666/spin.settings";
import Roll from "../2.dice/roll";
import RollSettings from "../2.dice/roll.settings";
import FruitSpinComponent from "../3.fruitland/spin";
import FruitSpinSettings from "../3.fruitland/spin.settings";
import Payments from "../4.lotto/payments/payments";
import Rounds from "../4.lotto/rounds/rounds";
import Settings from "../4.lotto/settings/settings";
import Withdraws from "../4.lotto/withdraws/withdraws";
import Dashboard from "../dashboard/dashboard";
import SideBar from "../sidebar/sideBar";

interface MainContainerProps {
    address: string;
    web3: Web3;
    bnbPrice: number;
}

const MainContainer: React.FC<MainContainerProps> = ({ bnbPrice, address, web3 }) => {
    const [diceBalance, setDiceBalances] = useState(BN(0));
    const [beastBalance, setBeastBalances] = useState(BN(0));
    const [fruitBalance, setFruitBalances] = useState(BN(0));
    useEffect(() => {
        getBalances(web3, setDiceBalances, setBeastBalances, setFruitBalances);
    }, [web3]);

    const bnString = (value: string) =>
        `${value} ~ ${(Number(value) * bnbPrice).toFixed(3)}$`;

    const overalBalance = weiToEther(diceBalance.add(beastBalance).add(fruitBalance));

    const dashboard = (
        <Dashboard
            overalBalance={bnString(overalBalance)}
            diceBalance={bnString(weiToEther(diceBalance))}
            beastBalance={bnString(weiToEther(beastBalance))}
            fruitBalance={bnString(weiToEther(fruitBalance))}
        />
    );

    return (
        <div className="fluid-container admin-fl">
            <div className="container-fluid admin-fl">
                <div className="row fluid-container admin-fl">
                    <SideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 pb-5">
                        <Switch>
                            <Route path="/admin/dashboard" render={() => dashboard} />
                            <Route path="/admin/users" render={() => dashboard} />
                            <Route
                                path="/admin/rounds"
                                render={() => <Rounds bnbPrice={bnbPrice} />}
                            />
                            <Route path="/admin/settings" component={Settings} />
                            <Route path="/admin/withdraws" component={Withdraws} />
                            <Route path="/admin/payments" component={Payments} />
                            <Route
                                path="/admin/rollsettings"
                                render={() => (
                                    <RollSettings
                                        address={address}
                                        balance={weiToEther(diceBalance)}
                                        web3={web3}
                                    />
                                )}
                            />
                            <Route
                                path="/admin/rolls"
                                render={() => <Roll address={address} web3={web3} />}
                            />
                            <Route
                                path="/admin/spinsettings"
                                render={() => (
                                    <SpinSettings
                                        address={address}
                                        balance={weiToEther(beastBalance)}
                                        web3={web3}
                                    />
                                )}
                            />
                            <Route
                                path="/admin/spins"
                                render={() => <Spin address={address} web3={web3} />}
                            />
                            <Route
                                path="/admin/fruitspinsettings"
                                render={() => (
                                    <FruitSpinSettings
                                        address={address}
                                        balance={weiToEther(fruitBalance)}
                                        web3={web3}
                                    />
                                )}
                            />
                            <Route
                                path="/admin/fruitspins"
                                render={() => (
                                    <FruitSpinComponent address={address} web3={web3} />
                                )}
                            />
                            <Route path="/admin" render={() => dashboard} />

                            <Redirect from="/" exact to="/" />
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;

const getBalances = (
    web3: Web3,
    setDiceBalances: Dispatch<SetStateAction<BigNumber>>,
    setBeastBalances: Dispatch<SetStateAction<BigNumber>>,
    setFruitBalances: Dispatch<SetStateAction<BigNumber>>
) => {
    web3.eth
        .getBalance(dice360ContractAddress)
        .then((res) => setDiceBalances(BN(res)))
        .catch((err) => console.error(err));
    web3.eth
        .getBalance(fruitContractAddress)
        .then((res) => setFruitBalances(BN(res)))
        .catch((err) => console.error(err));
    web3.eth
        .getBalance(beastContractAddress)
        .then((res) => setBeastBalances(BN(res)))
        .catch((err) => console.error(err));
};
