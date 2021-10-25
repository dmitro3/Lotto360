import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { ActionModel, LottoActions, LottoState } from "../../reducer/reducer";
import { GetRoundApiModel } from "../../api/models/round.model";
import RoundsHistory from "./rounds.history/rounds.history";
import { ChainMethods } from "../../provider/chain.methods";
import { maxTicketsEachBuy } from "../../config/config";
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
    const [isApproved, setIsApproved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { address, web3, ticketPrice, currentRound, bnbPrice } = state;

    useEffect(() => {
        if (!address || !web3) return;
        ChainMethods.checkAllowance(address, web3).then((allowance) => {
            const maxPay = ticketPrice * maxTicketsEachBuy;
            const maxPayInWei = web3.utils.toWei(`${maxPay}`, "ether");
            if (allowance === maxPayInWei) setIsApproved(true);
            else setIsApproved(false);
        });
    }, [address, ticketPrice, web3]);

    const totalBnb = calculateTotalAmount(currentRound);
    const changeArrovedLoading = (isApr: boolean, isLoa: boolean) => {
        setIsApproved(isApr);
        setIsLoading(isLoa);
    };

    return (
        <div>
            <Header address={address} dispatch={dispatch} />

            <Main
                changeArrovedLoading={changeArrovedLoading}
                currentPrizeAmount={totalBnb}
                dispatch={dispatch}
                isApproved={isApproved}
                isLoading={isLoading}
                state={state}
            />

            {currentRound.cid > 0 && bnbPrice ? (
                <PrizePot
                    changeArrovedLoading={changeArrovedLoading}
                    dispatch={dispatch}
                    isApproved={isApproved}
                    isLoading={isLoading}
                    state={state}
                />
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
