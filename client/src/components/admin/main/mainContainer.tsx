import React from "react";
import { Redirect, Switch } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import ProtectedRoute from "../security/protected.route";
import SideBar from "../sidebar/sideBar";

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = () => {
    return (
        <div className="fluid-container">
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 pb-5">
                        <Switch>
                            <ProtectedRoute
                                path="/admin/dashboard"
                                component={Dashboard}
                            />
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
