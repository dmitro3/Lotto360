import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthenticationService } from "./auth";

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
    // todo remove false
    if (!AuthenticationService.getCurrentUser() && false)
        return (
            <Redirect
                to={{
                    pathname: "/account/login",
                }}
            />
        );
    if (component) return <Route {...rest} component={component} />;
    else return <Route {...rest} render={render} />;
};

export default ProtectedRoute;
