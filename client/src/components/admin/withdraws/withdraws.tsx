import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { HashLoader } from "react-spinners";
import { HelperApiService } from "../../../api/helper.api.service";
import { Withdraws as IWithdraws } from "../../../interfaces/dashboard";
import { flexItemsCenter } from "../../site/constants/classes";

interface WithdrawsProps {}

const Withdraws: FunctionComponent<WithdrawsProps> = () => {
    const [withdrawsArray, setWithdraws] = useState<IWithdraws[]>();

    useEffect(() => {
        HelperApiService.getWithdraws()
            .then((res) => {
                if (res && res.data && res.data.result) setWithdraws(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!withdrawsArray) {
        return (
            <div className={flexItemsCenter}>
                <HashLoader />
            </div>
        );
    }

    return (
        <>
            <h4 className="fw-bold mb-3">Withdraws:</h4>
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
