import { Dispatch, FunctionComponent, useEffect } from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { GetRoundApiModel } from "../api/models/round.model";
import { ActionModel, LottoActions, LottoState } from "../reducer/reducer";
import Beast from "./666/666";
import Dice360 from "./dice360/dice.360";
import Header from "./lotto360/1.header/header";
import Footer from "./lotto360/7.footer/footer";

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
                                web3={web3}
                            />
                        )
                    }
                />

                <Route
                    path="/666"
                    render={() =>
                        // (
                        //     <div className="d-flex flex-column justify-content-center align-items-center bg6 min-height">
                        //         <h1 className="text-center p-5 fw-bold">Coming soon</h1>
                        //         <NavLink to={"/dice"}>
                        //             <button className="btn btn-primary">Play Dice</button>
                        //         </NavLink>
                        //     </div>
                        // )
                        address &&
                        web3 && (
                            <Beast address={address} balance={userBalance} web3={web3} />
                        )
                    }
                />

                <Route
                    path="/"
                    render={() => (
                        <>
                            <div className="d-flex flex-column justify-content-center align-items-center bg6 min-height">
                                <h1 className="text-center p-5 fw-bold">Coming soon</h1>
                                <NavLink to={"/dice"}>
                                    <button className="btn btn-primary">Play Dice</button>
                                </NavLink>
                            </div>
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
