import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthenticationService } from "./auth";

interface ProtectedRouteProps {
    path: string;
    component: FunctionComponent<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, path, ...rest }) => {
    // todo remove false
    if (!AuthenticationService.getCurrentUser() && false)
        return (
            <Redirect
                to={{
                    pathname: "/account/login",
                }}
            />
        );

    return <Route {...rest} component={component} />;
};

export default ProtectedRoute;
