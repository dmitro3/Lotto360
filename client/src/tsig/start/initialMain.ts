import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import Web3 from "web3";
import { coinGeckoApi, targetNetworkId } from "../config/config";
import { chainMethods } from "../provider/chain.methods";
import {
    ActionModel,
    chainResultToSubscriptionModel,
    ReducerActions,
} from "../reducer/reducer";

export const getInitialInfo = (
    dispatch: Dispatch<ActionModel<ReducerActions>>,
    address: string,
    web3: Web3,
    networkId?: number
) => {
    if (networkId !== targetNetworkId || !address) return;

    // BALANCE -------------------------------------------------------------------------------
    chainMethods
        .getUserBalance(address, web3)
        .then((res) => {
            if (!res || res === "0") return;
            const balance =
                Math.round(parseFloat(web3.utils.fromWei(res, "ether")) * 1000) / 1000;
            dispatch({
                type: ReducerActions.SET_USER_BALANCE,
                payload: balance,
            });
        })
        .catch((err) => console.error(err));

    // IS_ADMIN ------------------------------------------------------------------------------
    chainMethods
        .isAdmin(address, web3)
        .then((res) => {
            dispatch({
                type: ReducerActions.SET_IS_ADMIN,
                payload: res,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: ReducerActions.SET_IS_ADMIN,
                payload: false,
            });
        });

    // REFERRER_SHARE ------------------------------------------------------------------------
    chainMethods
        .getReferrerShare(address, web3)
        .then((res) => {
            dispatch({
                type: ReducerActions.SET_REFERRER_SHARE,
                payload: res,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: ReducerActions.SET_REFERRER_SHARE,
                payload: 0,
            });
        });

    // SUBSCRIPTION_FEE ----------------------------------------------------------------------
    chainMethods
        .getSubscriptionFee(address, web3)
        .then((res) => {
            dispatch({
                type: ReducerActions.SET_SUBSCRIPTION_FEE,
                payload: res,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: ReducerActions.SET_SUBSCRIPTION_FEE,
                payload: 0,
            });
        });

    // TOTAL_USERS ---------------------------------------------------------------------------
    chainMethods
        .getTotalUsers(address, web3)
        .then((res) => {
            dispatch({
                type: ReducerActions.SET_TOTAL_USERS,
                payload: res,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: ReducerActions.SET_TOTAL_USERS,
                payload: 0,
            });
        });

    // TOTAL_REFERRED ------------------------------------------------------------------------
    chainMethods
        .getMyTotalReferredUsers(address, web3)
        .then((res) => {
            dispatch({
                type: ReducerActions.SET_TOTAL_REFERRED,
                payload: res,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: ReducerActions.SET_TOTAL_REFERRED,
                payload: "0",
            });
        });

    // MY_SUBSCRIPTION -----------------------------------------------------------------------
    chainMethods
        .getMySubscription(address, web3)
        .then((res: []) => {
            dispatch({
                type: ReducerActions.SET_USER_SUBSCRIPTIONS,
                payload: chainResultToSubscriptionModel(res),
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: ReducerActions.SET_USER_SUBSCRIPTIONS,
                payload: [],
            });
        });

    // CURRENT_PRIZE -------------------------------------------------------------------------
    chainMethods
        .getCurrentPrize(address, web3)
        .then((res) => {
            dispatch({
                type: ReducerActions.SET_CURRENT_PRIZE,
                payload: Web3.utils.fromWei(res),
            });
        })
        .catch((err) => console.error("Error get prize", err));

    // BNB_PRICE -----------------------------------------------------------------------------
    axios
        .get(coinGeckoApi)
        .then((res: AxiosResponse<any>) => {
            if (
                res &&
                res.data &&
                res.data.market_data &&
                res.data.market_data.current_price.usd
            ) {
                dispatch({
                    type: ReducerActions.SET_BNB_PRICE,
                    payload: res.data.market_data.current_price.usd,
                });
            }
        })
        .catch((err) => console.error(err));
};
