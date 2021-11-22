import { FunctionComponent } from "react";
import { flexItemsCenter } from "../constants/classes";
import TargetNavigation from "../shared/target.nav.link";

interface HistoryHeaderProps {
    lastRound: number;
}

const HistoryHeader: FunctionComponent<HistoryHeaderProps> = ({ lastRound }) => {
    return (
        <>
            <TargetNavigation id={"history"} />
            <h2 className="text-center fw-bold text-white text-shadow">
                Checkout previous rounds!
            </h2>
            <div className={`text-center text-white mt-3 ${flexItemsCenter}`}>
                <span className="me-3 fw-bold fs-3 text-shadow text-info">
                    {lastRound}
                </span>
                <span className="fs-5 fw-bold text-shadow">total rounds</span>
            </div>
        </>
    );
};

export default HistoryHeader;
