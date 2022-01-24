import Beast from "./666/666";
import CheckWin from "./lotto360/4.check.win/checkwin";
import Dice360 from "./dice360/dice.360";
import Footer from "./lotto360/7.footer/footer";
import GameInfo from "./lotto360/6.game.info/game.info";
import Header from "./lotto360/1.header/header";
import Main from "./lotto360/2.main/main";
import PrizePot from "./lotto360/3.current.round/prize.pot";
import RoundsHistory from "./lotto360/5.rounds.history/rounds.history";
import { ActionModel, LottoActions, LottoState } from "../reducer/reducer";
import { Dispatch, FunctionComponent, useEffect } from "react";
import { GetRoundApiModel } from "../api/models/round.model";
import { Route, Switch } from "react-router";

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
                            <Main
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
                            <GameInfo />
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
