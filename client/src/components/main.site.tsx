import { Dispatch, FunctionComponent, useEffect } from "react";
import { Route, Switch } from "react-router";
import { GetRoundApiModel } from "../api/models/round.model";
import { ActionModel, LottoActions, LottoState } from "../reducer/reducer";
import Beast from "./1.666/666";
import Dice from "./2.dice/dice";
import Fruit from "./3.fruitland/fruit";
import Header from "./4.lotto/1.header/header";
import Footer from "./4.lotto/7.footer/footer";
import GameSelect from "./game.select";

interface MainSiteProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const MainSite: FunctionComponent<MainSiteProps> = ({ dispatch, state }) => {
    const { address, web3, ticketPrice, bnbPrice, maxTicketsPerBuy, userBalance } = state;

    useEffect(() => {
        if (!address || !web3) return;
    }, [address, maxTicketsPerBuy, ticketPrice, web3]);

    return (
        <div>
            <Header address={address} dispatch={dispatch} />

            <Switch>
                <Route
                    path="/dice"
                    render={() =>
                        address &&
                        web3 && <Dice address={address} balance={userBalance} bnbPrice={bnbPrice} web3={web3} />
                    }
                />

                <Route
                    path="/666"
                    render={() =>
                        address &&
                        web3 && <Beast address={address} balance={userBalance} bnbPrice={bnbPrice} web3={web3} />
                    }
                />

                <Route
                    path="/fruit"
                    render={() =>
                        address &&
                        web3 && <Fruit address={address} balance={userBalance} bnbPrice={bnbPrice} web3={web3} />
                    }
                />

                <Route
                    path="/"
                    render={() => (
                        <>
                            {address && bnbPrice && web3 ? (
                                <GameSelect address={address} currentPrize={bnbPrice} web3={web3} />
                            ) : (
                                <></>
                            )}
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
const calculateTotalAmount = ({ bnbAddedFromLastRound, bonusBnbAmount, totalBnbAmount }: GetRoundApiModel) =>
    totalBnbAmount + bonusBnbAmount + bnbAddedFromLastRound;
