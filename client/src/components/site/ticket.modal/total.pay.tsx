import { FunctionComponent } from "react";

interface TotalPayProps {
    ticketCount: string;
    ticketPrice: number;
}

const TotalPay: FunctionComponent<TotalPayProps> = ({ ticketCount, ticketPrice }) => {
    return (
        <>
            <div className="d-flex justify-content-between mt-1">
                <span className="text-dark fs-6">Ticket: {ticketPrice}</span>
                <span className="text-dark fs-6">Your balance: 0.025 BNB</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold fs-6 mb-0">Total pay</h5>
                <h5 className="fw-bold text-dark fs-6 mb-0">
                    {ticketCount ? ticketPrice * parseInt(ticketCount) : "0"} BNB
                </h5>
            </div>
        </>
    );
};

export default TotalPay;
