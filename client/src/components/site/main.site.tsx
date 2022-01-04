import { Dispatch, FunctionComponent, useEffect } from "react";
import { ActionModel, LottoActions, LottoState } from "../../reducer/reducer";
import { GetRoundApiModel } from "../../api/models/round.model";
import RoundsHistory from "./5.rounds.history/rounds.history";
import PrizePot from "./3.current.round/prize.pot";
import GameInfo from "./6.game.info/game.info";
import CheckWin from "./4.check.win/checkwin";
import Header from "./1.header/header";
import Main from "./2.main/main";
import Footer from "./7.footer/footer";

interface MainSiteProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const MainSite: FunctionComponent<MainSiteProps> = ({ dispatch, state }) => {
    const { address, web3, ticketPrice, currentRound, bnbPrice, maxTicketsPerBuy } =
        state;

    useEffect(() => {
        if (!address || !web3) return;
    }, [address, maxTicketsPerBuy, ticketPrice, web3]);

    const totalBnb = calculateTotalAmount(currentRound);

    return (
        <div>
            <Header address={address} dispatch={dispatch} />

            <Main currentPrizeAmount={totalBnb} dispatch={dispatch} state={state} />

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
