import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/main/admin/dashboard";
import { StateModel } from "../reducer/reducer";

interface SecureRouteProps {
    state: StateModel;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ state }) => {
    const { address, bnbPrice, currentPrize, isAdmin, referrerShare, subscriptionFee, web3 } = state;

    if (!isAdmin) {
        return (
            <Redirect
                to={{
                    pathname: "/index",
                }}
            />
        );
    }

    return (
        <Dashboard
            address={address}
            bnbPrice={bnbPrice}
            currentPrize={currentPrize}
            refShare={referrerShare}
            regFee={subscriptionFee}
            web3={web3}
        />
    );
};

export default SecureRoute;
