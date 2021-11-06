import React, { FunctionComponent, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { HashLoader } from "react-spinners";

import { AuthenticationApiService } from "../../api/auth.service";
import { LoginApiModel } from "../../api/models/auth.models";

interface ProtectedRouteProps {
    path: string;
    component?: FunctionComponent<any>;
    render?: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component,
    render,
    path,
    ...rest
}) => {
    const [user, setUser] = useState<LoginApiModel | undefined | string>("empty");

    useEffect(() => {
        AuthenticationApiService.getCurrentUser()
            .then((res) => {
                console.info(res.data.result);
                if (res && res.data && res.data.result) {
                    setUser(res.data.result);
                } else setUser(undefined);
            })
            .catch((err) => {
                console.error(err);
                setUser(undefined);
            });
    }, []);
    console.info(user);
    if (!user) {
        return (
            <Redirect
                to={{
                    pathname: "/admin/login",
                }}
            />
        );
    } else if (user === "empty") {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <HashLoader size={150} />
            </div>
        );
    }
    if (component) return <Route {...rest} component={component} />;
    else return <Route {...rest} render={render} />;
};

export default ProtectedRoute;
