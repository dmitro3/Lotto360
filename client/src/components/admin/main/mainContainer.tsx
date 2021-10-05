import React from "react";
import { Redirect, Switch } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import Rounds from "../rounds/rounds";
import ProtectedRoute from "../security/protected.route";
import SideBar from "../sidebar/sideBar";

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = () => {
    return (
        <div className="fluid-container admin-fl">
            <div className="container-fluid admin-fl">
                <div className="row fluid-container admin-fl">
                    <SideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 pb-5">
                        <Switch>
                            <ProtectedRoute
                                path="/admin/dashboard"
                                component={Dashboard}
                            />
                            <ProtectedRoute path="/admin/users" component={Dashboard} />
                            <ProtectedRoute path="/admin/rounds" component={Rounds} />
                            <ProtectedRoute path="/admin/setting" component={Dashboard} />
                            <ProtectedRoute path="/admin" component={Dashboard} />
                            {/*  <ProtectedRoute path="/roles/:id" component={RoleForm} />
                            <ProtectedRoute path="/404" component={NotFount404} /> */}

                            <Redirect from="/" exact to="/" />
                            <Redirect to="/404" />
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
