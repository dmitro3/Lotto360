import { FunctionComponent } from "react";
import { flexItemsCenter } from "../constants/classes";

interface PrizeBoxHeaderProps {
    endTime: number;
}

const PrizeBoxHeader: FunctionComponent<PrizeBoxHeaderProps> = ({ endTime }) => {
    return (
        <>
            <h2 className="text-center fw-bold text-white text-shadow">
                Participate in current round!
            </h2>

            <div className={`text-center text-white mt-3 ${flexItemsCenter}`}>
                <span className="me-3 fw-bold fs-3 text-green">5h 45m</span>
                <span className="fs-5 fw-bold text-shadow">until next draw</span>
            </div>
        </>
    );
};

export default PrizeBoxHeader;
