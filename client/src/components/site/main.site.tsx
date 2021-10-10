import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { ActionModel, LottoActions, LottoState } from "../../reducer/reducer";
import RoundsHistory from "./rounds.history/rounds.history";
import PrizePot from "./current.round/prize.pot";
import GameInfo from "./game.info/game.info";
import CheckWin from "./check.win/checkwin";
import Header from "./header/header";
import Main from "./main/main";
import { ChainMethods } from "../../provider/chain.methods";
import { maxTicketsEachBuy } from "../../config/config";

interface MainSiteProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const MainSite: FunctionComponent<MainSiteProps> = ({ dispatch, state }) => {
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        if (!state.address || !state.web3) return;
        ChainMethods.checkAllowance(state.address, state.web3).then((allowance) => {
            const maxPay = state.ticketPrice * maxTicketsEachBuy;
            if (allowance < maxPay) {
                setIsApproved(false);
            } else setIsApproved(true);
        });
    }, [state.address, state.ticketPrice, state.web3]);

    let totalBnb = 0;
    if (state.currentRound) {
        const { bnbAddedFromLastRound, bonusBnbAmount, totalBnbAmount } =
            state.currentRound;
        if (totalBnbAmount) totalBnb += totalBnbAmount;
        if (bonusBnbAmount) totalBnb += bonusBnbAmount;
        if (bnbAddedFromLastRound) totalBnb += bnbAddedFromLastRound;
    }

    const changeIsApproved = (value: boolean) => setIsApproved(value);

    return (
        <div>
            <Header address={state.address} dispatch={dispatch} />

            <Main
                changeIsApproved={changeIsApproved}
                currentPrizeAmount={totalBnb}
                isApproved={isApproved}
                state={state}
            />

            {state.currentRound && state.bnbPrice && (
                <PrizePot
                    changeIsApproved={changeIsApproved}
                    isApproved={isApproved}
                    state={state}
                />
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
