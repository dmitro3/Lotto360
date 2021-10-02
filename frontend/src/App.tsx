import { useEffect, useReducer } from "react";
import CheckWin from "./components/check.win/checkwin";
import Header from "./components/header/header";
import Main from "./components/main/main";
import PrizePot from "./components/current.round/prize.pot";
import RoundsHistory from "./components/rounds.history/rounds.history";
import lottoReducer, { initialState } from "./reducer/reducer";
import { getWeb3 } from "./utilities/web3";
import GameInfo from "./components/game.info/game.info";

function App() {
    const [state, dispatch] = useReducer(lottoReducer, initialState);

    useEffect(() => {
        getWeb3(dispatch);
    }, []);

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
}

export default App;
