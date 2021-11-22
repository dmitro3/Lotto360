import { FunctionComponent } from "react";
import { flexItemsCenter } from "../constants/classes";

interface RoundNumberProps {
    number: number;
}

const RoundNumber: FunctionComponent<RoundNumberProps> = ({ number }) => {
    return (
        <div className="d-flex mt-1">
            <div className={`${flexItemsCenter} badge bg-secondary`}>
                <i className="fa-solid fa-hashtag me-2 fa-lg"></i>
                <span className="fs-5">{number}</span>
            </div>
        </div>
    );
};

export default RoundNumber;
