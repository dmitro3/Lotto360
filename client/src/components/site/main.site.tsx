import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { ActionModel, LottoActions, LottoState } from "../../reducer/reducer";
import { GetRoundApiModel } from "../../api/models/round.model";
import RoundsHistory from "./5.rounds.history/rounds.history";
import { ChainMethods } from "../../provider/chain.methods";
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
    const [isApproved, setIsApproved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { address, web3, ticketPrice, currentRound, bnbPrice, maxTicketsPerBuy } =
        state;

    useEffect(() => {
        if (!address || !web3) return;
        ChainMethods.checkAllowance(address, web3).then((allowance) => {
            const maxPay = ticketPrice * maxTicketsPerBuy;
            const maxPayInWei = web3.utils.toWei(`${maxPay}`, "ether");
            if (allowance === maxPayInWei) setIsApproved(true);
            else setIsApproved(false);
        });
    }, [address, maxTicketsPerBuy, ticketPrice, web3]);

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
