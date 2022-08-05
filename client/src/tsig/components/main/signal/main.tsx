import { FunctionComponent } from "react";
import { StateModel } from "../../../reducer/reducer";
import FeelLucky from "./feel.lucky";
import HowTo from "./howto";
import MainBanner from "./main.banner";
import PurchaseHistory from "./purchase.history";
import Refer from "./refer";
import Support from "./support";
import TermsAndServices from "./terms.and.services";

interface MainProps {
    state: StateModel;
    updateInfo: () => void;
}

const Main: FunctionComponent<MainProps> = ({ state, updateInfo }) => {
    return (
        <main>
            <MainBanner state={state} updateInfo={updateInfo} />

            {state.userSubscription.length > 0 && (
                <PurchaseHistory
                    address={state.address!}
                    totalReferred={state.totalReferred}
                    userSubscription={state.userSubscription}
                />
            )}

            <div className={state.userSubscription.length > 0 ? "bg_gray" : ""}>
                {state.address && state.web3 && (
                    <FeelLucky
                        address={state.address}
                        currentPrize={state.currentPrize}
                        web3={state.web3}
                    />
                )}
            </div>

            <div className={state.userSubscription.length === 0 ? "bg_gray" : ""}>
                <HowTo />
            </div>

            <div className={state.userSubscription.length > 0 ? "bg_gray" : ""}>
                <Refer />
            </div>

            <div className={state.userSubscription.length === 0 ? "bg_gray " : ""}>
                <TermsAndServices />
            </div>

            <div className={state.userSubscription.length > 0 ? "bg_gray " : ""}>
                <Support />
            </div>
        </main>
    );
};

export default Main;
