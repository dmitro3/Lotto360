import { FunctionComponent } from "react";
import { PoolAttrs, PoolWinnersAttr } from "../../../api/models/round.model";
import PrizeBox from "./prize.box";

interface PrizePerMatchProps {
    amount: number;
    bnbPrice: number;
    percentages?: PoolAttrs[];
    poolWinners?: PoolWinnersAttr;
}

const PrizePerMatch: FunctionComponent<PrizePerMatchProps> = ({
    amount,
    bnbPrice,
    percentages,
    poolWinners,
}) => {
    return (
        <>
            <h4 className="text-center mt-5 fw-bold">
                Prize amount per correct matches:
            </h4>

            <div className="d-flex flex-wrap justify-content-center mt-4">
                <PrizeBox
                    amount={amount}
                    bnbPrice={bnbPrice}
                    pools={percentages!}
                    poolWinners={poolWinners}
                />
            </div>
        </>
    );
};

export default PrizePerMatch;
