import { FunctionComponent } from "react";
import { flexItemsCenter } from "../../constants/classes";

interface AddedBnbProps {
    bnbAddedFromLastRound: number;
    bonusBnbAmount: number;
}

const AddedBnb: FunctionComponent<AddedBnbProps> = ({
    bnbAddedFromLastRound,
    bonusBnbAmount,
}) => {
    return (
        <div className={`${flexItemsCenter}`}>
            <div className={`${flexItemsCenter} mt-3 me-5`}>
                <i className="fa-duotone fa-coins me-2 fa-lg"></i>
                <span className="fs-5 fw-bold me-2">BNB from previous round:</span>
                <span className="fs-5 text-dark">{bnbAddedFromLastRound}</span>
            </div>
            <div className={`${flexItemsCenter} mt-3`}>
                <i className="fa-duotone fa-coins me-2 fa-lg"></i>
                <span className="fs-5 fw-bold me-2">Bonus:</span>
                <span className="fs-5 text-dark">{bonusBnbAmount}</span>
            </div>
        </div>
    );
};

export default AddedBnb;
