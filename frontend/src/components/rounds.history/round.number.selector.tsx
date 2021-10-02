import { FunctionComponent } from "react";
import { flexItemsCenter } from "../constants/classes";

interface RoundNumberSelectorProps {
    number: number;
}

const RoundNumberSelector: FunctionComponent<RoundNumberSelectorProps> = ({ number }) => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-1 px-5 history-divide pb-3 mb-3">
            <i className="fa-solid fa-angles-left me-2 pointer p-1 px-2 hover-icon rounded"></i>
            <i className="fa-solid fa-angle-left me-2 pointer p-1 px-2 hover-icon rounded"></i>
            <div className={`${flexItemsCenter} badge bg-secondary me-2`}>
                <i className="fa-solid fa-hashtag me-2 fa-lg"></i>
                <span className="fs-5">{number}</span>
            </div>
            <i className="fa-solid fa-angle-right me-2 pointer p-1 px-2 hover-icon rounded"></i>
            <i className="fa-solid fa-angles-right pointer p-1 px-2 hover-icon rounded"></i>
        </div>
    );
};

export default RoundNumberSelector;
