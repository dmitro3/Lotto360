import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions, LottoState } from "../../reducer/reducer";
import CheckWin from "./check.win/checkwin";
import PrizePot from "./current.round/prize.pot";
import GameInfo from "./game.info/game.info";
import Header from "./header/header";
import Main from "./main/main";
import RoundsHistory from "./rounds.history/rounds.history";

interface MainSiteProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const MainSite: FunctionComponent<MainSiteProps> = ({ dispatch, state }) => {
    return (
        <div>
            <Header address={state.address} dispatch={dispatch} />
            <Main
                bnbPriceInUSD={state.bnbPrice}
                currentPrizeAmount={state.currentPrize}
            />
            <PrizePot currentPrizeAmount={state.currentPrize} />
            <CheckWin />
            <RoundsHistory historyAmount={state.historyAmount} />
            <GameInfo />
        </div>
    );
};

export default MainSite;
