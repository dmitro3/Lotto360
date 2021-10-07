import { FunctionComponent } from "react";
import { PoolAttrs } from "../../../api/models/round.model";
import PrizeBox from "./prize.box";

interface PrizePerMatchProps {
    amount: number;
    percentages?: PoolAttrs[];
}

const PrizePerMatch: FunctionComponent<PrizePerMatchProps> = ({
    amount,
    percentages,
}) => {
    return (
        <>
            <h4 className="text-center mt-5 fw-bold">
                Prize amount per correct matches:
            </h4>

            <div className="d-flex flex-wrap justify-content-center mt-4">
                <PrizeBox amount={amount} pools={percentages!} />
            </div>
        </>
    );
};

export default PrizePerMatch;
