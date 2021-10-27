import { FunctionComponent, useState } from "react";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { flexItemsCenter } from "../constants/classes";

interface UserTicketsProps {
    winningTicket: number;
    ticketNumbers: string[];
}

const UserTickets: FunctionComponent<UserTicketsProps> = ({
    ticketNumbers,
    winningTicket,
}) => {
    const [isHide, setIsHide] = useState(true);
    const winningNumber = ticketNumToStr(winningTicket);

    return (
        <>
            <div className={`${flexItemsCenter} mb-3 fs-4`}>
                <i className="fa-duotone fa-ticket me-2 text-warning"></i>
                <span className="fw-bold">Your tickets ({ticketNumbers.length})</span>
                {ticketNumbers.length > 0 && (
                    <i
                        onClick={() => setIsHide(!isHide)}
                        className={
                            isHide
                                ? "fa-duotone fa-eye-slash ms-2 text-warning pointer"
                                : "fa-duotone fa-eye ms-2 text-warning pointer"
                        }
                        title="toggle view"
                    ></i>
                )}
            </div>

            {ticketNumbers.length > 0 && (
                <div
                    className={`flex-wrap ${flexItemsCenter} ticket-box border rounded border-2 border-secondary`}
                >
                    {ticketNumbers.map((number, i) => {
                        const winClass =
                            number[0] === winningNumber[0] ? " ticket-win" : "";
                        let isLoose = false;
                        return (
                            <div
                                key={i}
                                className={`ticket ${flexItemsCenter}${winClass}`}
                            >
                                <span className={`fs-4 fw-bold ${isHide && "text-blur"}`}>
                                    {number.split("").map((str, j) => {
                                        const numberClass =
                                            number[j] === winningNumber[j]
                                                ? "text-success"
                                                : "text-danger";
                                        const shapeClass =
                                            isLoose && number[j] === winningNumber[j]
                                                ? "regular"
                                                : "solid";
                                        if (number[j] !== winningNumber[j])
                                            isLoose = true;
                                        return (
                                            <i
                                                key={j + i}
                                                className={`fa-${shapeClass} fa-square-${str} ticket-number ${numberClass}`}
                                            ></i>
                                        );
                                    })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default UserTickets;
