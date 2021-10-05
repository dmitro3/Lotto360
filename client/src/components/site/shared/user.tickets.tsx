import { FunctionComponent, useState } from "react";
import { flexItemsCenter } from "../constants/classes";

interface UserTicketsProps {
    ticketNumbers: string[];
}

const UserTickets: FunctionComponent<UserTicketsProps> = ({ ticketNumbers }) => {
    const [isHide, setIsHide] = useState(true);

    return (
        <>
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
                {ticketNumbers.map((number, i) => (
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
        </>
    );
};

export default UserTickets;
