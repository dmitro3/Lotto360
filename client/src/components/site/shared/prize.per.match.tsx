import { FunctionComponent } from "react";
import { PoolAttrs, RoundStatus, TicketAttrs } from "../../../api/models/round.model";
import PrizeBox from "./prize.box";

interface PrizePerMatchProps {
    amount: number;
    bnbPrice: number;
    finalNumber: number;
    tickets?: TicketAttrs[];
    percentages?: PoolAttrs[];
    status: RoundStatus;
}

const PrizePerMatch: FunctionComponent<PrizePerMatchProps> = ({
    amount,
    bnbPrice,
    percentages,
    finalNumber,
    tickets,
    status,
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
                    finalNumber={finalNumber}
                    tickets={tickets}
                    pools={percentages!}
                    status={status}
                />
            </div>
        </>
    );
};

export default PrizePerMatch;
