import moment from "moment";
import { FunctionComponent } from "react";
import { flexItemsCenter } from "../../constants/classes";

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
                <span className="fs-4 fw-bold text-shadow">Next draw</span>
                <span className="ms-2 fw-bold fs-4 text-green">
                    {moment(endTime * 1000).fromNow()}
                </span>
            </div>
        </>
    );
};

export default PrizeBoxHeader;
