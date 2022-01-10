import moment from "moment";
import { FunctionComponent } from "react";
import { currencyFormat } from "../../../utilities/string.numbers.util";
import { flexItemsCenter } from "../../constants/classes";

interface TimeAndTotalAmountProps {
    bnbPrice: number;
    time: number;
    totalAmount: number;
}

const TimeAndTotalAmount: FunctionComponent<TimeAndTotalAmountProps> = ({
    bnbPrice,
    time,
    totalAmount,
}) => {
    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className={flexItemsCenter}>
                <span className="fs-5 fw-bold me-2">
                    Total amount:{" "}
                    <span className="text-dark">
                        {currencyFormat(totalAmount, "BNB")}
                    </span>
                </span>
                <span className="fs-5 text-success">
                    {currencyFormat(bnbPrice * totalAmount, "$")}
                </span>
            </div>

            <div className={flexItemsCenter}>
                <i className="fa-duotone fa-alarm-clock me-2 fa-lg"></i>
                <div className="fs-5">
                    {moment(time * 1000).format("MMMM Do YYYY, h:mm a")}
                </div>
            </div>
        </div>
    );
};

export default TimeAndTotalAmount;
