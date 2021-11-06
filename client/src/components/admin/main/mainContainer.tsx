import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import Rounds from "../rounds/rounds";
import ProtectedRoute from "../../security/protected.route";
import SideBar from "../sidebar/sideBar";
import Settings from "../settings/settings";

interface MainContainerProps {
    bnbPrice: number;
}

const MainContainer: React.FC<MainContainerProps> = ({ bnbPrice }) => {
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
