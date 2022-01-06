import { FunctionComponent, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import moment from "moment";

import { Withdraws as IWithdraws } from "../../../interfaces/dashboard";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { HelperApiService } from "../../../api/helper.api.service";
import { flexItemsCenter } from "../../site/constants/classes";
import { TicketAttrs } from "../../../api/models/round.model";

interface WithdrawsProps {}

const Withdraws: FunctionComponent<WithdrawsProps> = () => {
    const [withdrawsArray, setWithdraws] = useState<IWithdraws[]>();
    const [ticketsArray, setTicketsArray] = useState<TicketAttrs[]>();

    useEffect(() => {
        HelperApiService.getWithdraws()
            .then((res) => {
                if (res && res.data && res.data.result) setWithdraws(res.data.result);
            })
            .catch((err) => console.error(err));
        HelperApiService.getTickets()
            .then((res) => {
                if (res && res.data && res.data.result) setTicketsArray(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!withdrawsArray || !ticketsArray) {
        return (
            <div className={flexItemsCenter}>
                <HashLoader />
            </div>
        );
    }

    const withdrawsCsvData = [
        ["id", "amount", "recipient", "transfer time"],
        ...withdrawsArray.map((w) => [
            w.id,
            w.amount,
            w.address,
            moment(w.time * 1000).format("Do MMMM YYYY, h:mm a"),
        ]),
    ];

    const ticketsCsvData = [
        ["id", "owner", "numbers", "isClaimed"],
        ...ticketsArray.map((w) => [
            w.cid,
            w.owner,
            `# ${ticketNumToStr(w.number)}`,
            w.isClaimed,
        ]),
    ];

    return (
        <>
            <h4 className="fw-bold mb-3 d-flex">
                Withdraws:{" "}
                <button className="btn btn-primary ms-auto">
                    <CSVLink
                        data={withdrawsCsvData}
                        className="text-white text-decoration-none"
                    >
                        withdraws csv
                    </CSVLink>
                </button>
                <button className="btn btn-primary ms-2">
                    <CSVLink
                        data={ticketsCsvData}
                        className="text-white text-decoration-none"
                    >
                        tickets csv
                    </CSVLink>
                </button>
            </h4>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th># Id</th>
                        <th>Amount</th>
                        <th>Recipient</th>
                        <th>Transfer time</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawsArray.map((w, i) => (
                        <tr key={i}>
                            <td>{w.id}</td>
                            <td>{w.amount}</td>
                            <td>{w.address}</td>
                            <td>
                                {moment(w.time * 1000).format("Do MMMM YYYY, h:mm a")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Withdraws;
