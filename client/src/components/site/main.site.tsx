import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions, LottoState } from "../../reducer/reducer";
import RoundsHistory from "./rounds.history/rounds.history";
import PrizePot from "./current.round/prize.pot";
import GameInfo from "./game.info/game.info";
import CheckWin from "./check.win/checkwin";
import Header from "./header/header";
import Main from "./main/main";

interface MainSiteProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const MainSite: FunctionComponent<MainSiteProps> = ({ dispatch, state }) => {
    let totalBnb = 0;
    if (state.currentRound) {
        const { bnbAddedFromLastRound, bonusBnbAmount, totalBnbAmount } =
            state.currentRound;
        if (totalBnbAmount) totalBnb += totalBnbAmount;
        if (bonusBnbAmount) totalBnb += bonusBnbAmount;
        if (bnbAddedFromLastRound) totalBnb += bnbAddedFromLastRound;
    }

    return (
        <div>
            <Header address={state.address} dispatch={dispatch} />
            <Main bnbPriceInUSD={state.bnbPrice} currentPrizeAmount={totalBnb} />
            {state.currentRound && state.bnbPrice && (
                <PrizePot bnbPrice={state.bnbPrice} currentRound={state.currentRound} />
            )}
            <CheckWin />
            <RoundsHistory
                bnbPrice={state.bnbPrice}
                historyAmount={state.historyAmount}
            />
            <GameInfo />
        </div>
    );
};

export default MainSite;
