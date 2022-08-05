import { FunctionComponent } from "react";
import { SubscriptionModel } from "../../../reducer/reducer";

interface SubscriptionTableProps {
    onClick?: (val: number) => void;
    lastSubscription?: string;
    userSubscription: SubscriptionModel[];
}

const SubscriptionTable: FunctionComponent<SubscriptionTableProps> = ({
    lastSubscription,
    onClick,
    userSubscription,
}) => {
    return (
        <table className="table table-borderless table-dark table-striped mb-0 table-responsive-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">telegram id</th>
                    <th scope="col">payed</th>
                    <th scope="col">date</th>
                    <th scope="col">wallet</th>
                </tr>
            </thead>
            <tbody>
                {userSubscription.map((r, i) => {
                    const rowClass =
                        Number(lastSubscription) === r.id ? "text-success" : "";
                    return (
                        <tr key={i}>
                            <th
                                className={`pointer ${rowClass}`}
                                scope="row"
                                onClick={() => onClick && onClick(r.id)}
                            >
                                {r.id}
                            </th>
                            <td className={rowClass}>{r.telegramId}</td>
                            <td className={rowClass}>{r.payment}</td>
                            <td className={rowClass}>{r.date}</td>
                            <td className={rowClass}>{r.wallet}</td>
                        </tr>
                    );
                })}
                {userSubscription.length === 0 ? (
                    <tr>
                        <th>0</th>
                        <td>@</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0x</td>
                    </tr>
                ) : (
                    <></>
                )}
            </tbody>
        </table>
    );
};

export default SubscriptionTable;
