import { Dispatch, FunctionComponent, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Footer } from "rsuite";
import { GetRoundApiModel } from "../api/models/round.model";
import { ActionModel, LottoActions, LottoState } from "../reducer/reducer";
import Beast from "./1.666/666";
import Dice360 from "./2.dice360/dice.360";
import Fruit from "./3.fruitland/fruit";
import Header from "./4.lotto360/1.header/header";

interface MainSiteProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const MainSite: FunctionComponent<MainSiteProps> = ({ dispatch, state }) => {
    const {
        address,
        web3,
        ticketPrice,
        currentRound,
        bnbPrice,
        maxTicketsPerBuy,
        userBalance,
    } = state;

    useEffect(() => {
        if (!address || !web3) return;
    }, [address, maxTicketsPerBuy, ticketPrice, web3]);

    const totalBnb = calculateTotalAmount(currentRound);

    return (
        <div>
            <Header address={address} dispatch={dispatch} />

            <Switch>
                <Route
                    path="/dice"
                    render={() =>
                        address &&
                        web3 && (
                            <Dice360
                                address={address}
                                balance={userBalance}
                                bnbPrice={bnbPrice}
                                web3={web3}
                            />
                        )
                    }
                />

                <Route
                    path="/666"
                    render={() =>
                        address &&
                        web3 && (
                            <Beast
                                address={address}
                                balance={userBalance}
                                bnbPrice={bnbPrice}
                                web3={web3}
                            />
                        )
                    }
                />

                <Route
                    path="/fruit"
                    render={() =>
                        address &&
                        web3 && (
                            <Fruit
                                address={address}
                                balance={userBalance}
                                bnbPrice={bnbPrice}
                                web3={web3}
                            />
                        )
                    }
                />

                <Route
                    path="/"
                    render={() => (
                        <>
                            <Redirect to="/fruit" />
                            {/* <Main
                                currentPrizeAmount={totalBnb}
                                dispatch={dispatch}
                                state={state}
                            />

                            {currentRound.cid > 0 && bnbPrice ? (
                                <PrizePot dispatch={dispatch} state={state} />
                            ) : (
                                <></>
                            )}

                            {state.address && <CheckWin address={state.address} />}
                            {state.address && (
                                <RoundsHistory
                                    bnbPrice={state.bnbPrice}
                                    address={state.address}
                                    currentRound={state.currentRound}
                                />
                            )}
                            <GameInfo /> */}
                            <Footer />
                        </>
                    )}
                />
            </Switch>
        </div>
    );
};

export default MainSite;

// ..........................................................................................
const calculateTotalAmount = ({
    bnbAddedFromLastRound,
    bonusBnbAmount,
    totalBnbAmount,
}: GetRoundApiModel) => totalBnbAmount + bonusBnbAmount + bnbAddedFromLastRound;
