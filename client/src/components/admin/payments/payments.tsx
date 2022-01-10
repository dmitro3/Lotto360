import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { HelperApiService } from "../../../api/helper.api.service";
import { blockExplorerUrl } from "../../../config/config";
import { PaymentAttrs } from "../../../interfaces/payments";
import { flexItemsCenter } from "../../constants/classes";

interface PaymentsProps {}

const Payments: FunctionComponent<PaymentsProps> = () => {
    const [payments, setPaymentsArray] = useState<PaymentAttrs[]>();
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        HelperApiService.getPayments()
            .then((res) => {
                if (res && res.data && res.data.result) setPaymentsArray(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!payments) {
        return (
            <div className={flexItemsCenter}>
                <HashLoader />
            </div>
        );
    }

    const getUserPayments = () => {
        if (!address) {
            toast.error("please enter address");
            return;
        }
        HelperApiService.getUserPayments(address)
            .then((res) => {
                if (res && res.data && res.data.result) setPaymentsArray(res.data.result);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <h4 className="fw-bold mb-3 d-flex">Payments:</h4>
            <div className="d-flex col col-4 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        aria-label="Enter address"
                        aria-describedby="button-addon2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        id="button-addon2"
                        onClick={() => getUserPayments()}
                    >
                        search by address
                    </button>
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Transfer time</th>
                        <th>Transaction link</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((p, i) => (
                        <tr key={i}>
                            <td>{p.address}</td>
                            <td>{p.amount}</td>
                            <td>{moment(p.date).format("Do MMMM YYYY, h:mm a")}</td>
                            <td>
                                <a
                                    target="_blank"
                                    href={`${blockExplorerUrl}tx/${p.transaction}`}
                                    rel="noreferrer"
                                >
                                    click
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Payments;
