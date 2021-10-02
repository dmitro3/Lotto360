import { FunctionComponent } from "react";
import PrizePerMatch from "../shared/prize.per.match";
import RoundNumber from "./round.number";
import TimeAndTotalAmount from "../shared/time.total.amount";
import UserTickets from "../shared/user.tickets";
import PrizeBoxHeader from "./header";

interface PrizePotProps {
    currentPrizeAmount: number;
}
// todo remove this
const fakeNumberArray = ["456787", "889356", "342267", "009988", "567894"];

const PrizePot: FunctionComponent<PrizePotProps> = ({ currentPrizeAmount }) => {
    return (
        <div className="prizepot p-5 position-relative">
            <PrizeBoxHeader endTime={563646262646} />

            <div className="container bg-white rounded shadow p-4 mt-4 mb-5">
                <TimeAndTotalAmount time={5555555} totalAmount={6767676} />
                <RoundNumber number={690} />
                <PrizePerMatch amount={currentPrizeAmount} percentages={[]} />

                <div className="dashed my-5"></div>
                <UserTickets ticketNumbers={fakeNumberArray} />

                <div
                    className="max-content px-3 py-1 d-flex flex-column mb-3 mt-5
                justify-content-center align-items-center mx-auto rounded text-black"
                >
                    <i className="fa-duotone fa-chevrons-down fa-xl fa-flash text-success"></i>
                    <button type="button" className="btn btn-lg btn-success mx-3 mt-4">
                        <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                        Buy Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrizePot;
