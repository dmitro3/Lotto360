import { FunctionComponent, useState } from "react";
import PrizePerMatch from "../shared/prize.per.match";
import TimeAndTotalAmount from "../shared/time.total.amount";
import RoundNumberSelector from "./round.number.selector";

interface RoundsHistoryProps {
    historyAmount: number;
}

const fakeNumberArray = ["456787", "889356", "342267", "009988", "567894"];
const flexItemsCenter = "d-flex justify-content-center align-items-center";

const RoundsHistory: FunctionComponent<RoundsHistoryProps> = ({ historyAmount }) => {
    const [isHide, setIsHide] = useState(true);

    return (
        <div className="bg-dark p-5 position-relative">
            <h2 className="text-center fw-bold text-white text-shadow">
                Checkout previous rounds!
            </h2>
            <div className={`text-center text-white mt-3 ${flexItemsCenter}`}>
                <span className="me-3 fw-bold fs-3 text-shadow text-info">758</span>
                <span className="fs-5 fw-bold text-shadow">total rounds</span>
            </div>
            <div className="container bg-white rounded shadow p-4 mt-4 mb-5">
                <div className="text-center">
                    <span className="badge rounded-pill bg-success mb-2 fs-6">
                        latest round
                    </span>
                </div>

                <RoundNumberSelector number={900} />
                <TimeAndTotalAmount totalAmount={800} time={566666666} />
                <PrizePerMatch amount={historyAmount} percentages={[]} />

                <div className="dashed my-5"></div>

                <div className={`${flexItemsCenter} mb-3 fs-4`}>
                    <i className="fa-duotone fa-ticket me-2 text-warning"></i>
                    <span className="fw-bold">Your tickets (5)</span>
                    <i
                        onClick={() => {
                            console.info("object");
                            setIsHide(!isHide);
                        }}
                        className={
                            isHide
                                ? "fa-duotone fa-eye-slash ms-2 text-muted pointer"
                                : "fa-duotone fa-eye ms-2 text-success pointer"
                        }
                        title="toggle view"
                    ></i>
                </div>

                <div className={`flex-wrap ${flexItemsCenter}`}>
                    {fakeNumberArray.map((number, i) => (
                        <div key={i} className={`ticket ${flexItemsCenter}`}>
                            <span
                                className={`fs-4 font-monospace fw-bold ${
                                    isHide && "text-blur"
                                }`}
                            >
                                {number}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5 border-transparent"></div>
            <div className="divider-history"></div>
        </div>
    );
};

export default RoundsHistory;
