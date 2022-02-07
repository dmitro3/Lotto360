import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Web3 from "web3";
import Spin from "../1.666/spin";
import SpinSettings from "../1.666/spin.settings";
import Roll from "../2.dice/roll";
import RollSettings from "../2.dice/roll.settings";
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
    return (
        <div className="fluid-container admin-fl">
            <div className="container-fluid admin-fl">
                <div className="row fluid-container admin-fl">
                    <SideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 pb-5">
                        <Switch>
                            <Route path="/admin/dashboard" component={Dashboard} />
                            <Route path="/admin/users" component={Dashboard} />
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
                                    <RollSettings address={address} web3={web3} />
                                )}
                            />
                            <Route
                                path="/admin/rolls"
                                render={() => <Roll address={address} web3={web3} />}
                            />
                            <Route
                                path="/admin/spinsettings"
                                render={() => (
                                    <SpinSettings address={address} web3={web3} />
                                )}
                            />
                            <Route
                                path="/admin/spins"
                                render={() => <Spin address={address} web3={web3} />}
                            />
                            <Route path="/admin" component={Dashboard} />

                            <Redirect from="/" exact to="/" />
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
