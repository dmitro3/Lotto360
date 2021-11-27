import moment from "moment";
import { FunctionComponent, useState } from "react";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { RoundApiService } from "../../../api/round.api.service";
import { flexItemsCenter } from "../constants/classes";
import ButtonWaiting from "../shared/btn.waiting";

interface UserHistoryProps {
    getnewRound: (value: number) => void;
    userAddress: string;
}

const UserHistory: FunctionComponent<UserHistoryProps> = ({
    getnewRound,
    userAddress,
}) => {
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rounds, setRounds] = useState<GetRoundApiModel[]>();

    const getHistory = () => {
        setLoading(true);
        setDisableButton(true);
        RoundApiService.getUserHistory(userAddress)
            .then((res) => {
                if (res && res.data && res.data.result) {
                    setRounds(res.data.result);
                }
            })
            .catch((err) => {
                console.error(err);
                setDisableButton(false);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <div className={flexItemsCenter}>
                <button
                    disabled={disableButton}
                    onClick={getHistory}
                    className="btn btn-secondary mt-3 shadow"
                >
                    {loading && <ButtonWaiting />}
                    {!loading && "Your history"}
                </button>
            </div>

            <div className="container p-0 overflow-hidden rounded mt-3">
                {rounds ? (
                    <table className="table table-light table-hover table-bordered table-striped m-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col"># Round</th>
                                <th scope="col">Draw Time</th>
                                <th scope="col">Your Tickets</th>
                                <th scope="col">Winning Tickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rounds?.map((round, i) => {
                                if (!round.tickets) return <></>;
                                let winningTickets = 0;
                                if (round.winnersInPools) {
                                    const {
                                        match1,
                                        match2,
                                        match3,
                                        match4,
                                        match5,
                                        match6,
                                    } = round.winnersInPools;

                                    winningTickets =
                                        match1.length +
                                        match2.length +
                                        match3.length +
                                        match4.length +
                                        match5.length +
                                        match6.length;
                                }

                                return (
                                    <tr key={i} className="table-active">
                                        <td>{`# ${round.cid}`}</td>
                                        <td>
                                            {moment(round.endTime * 1000).format(
                                                "MMMM Do, YYYY, h:mm a"
                                            )}
                                        </td>
                                        <td>{round.tickets.length}</td>
                                        <td>
                                            {winningTickets > 0 ? (
                                                <a
                                                    href="#round-history"
                                                    className="text-dark pointer fw-bold"
                                                    onClick={() =>
                                                        getnewRound(winningTickets)
                                                    }
                                                >
                                                    {`${winningTickets} - click`}
                                                </a>
                                            ) : (
                                                "❌"
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : disableButton ? (
                    <div className={flexItemsCenter}>
                        <span className="mt-3 text-white fs-5 fw-bold text-shadow">
                            No recorded history for your current account
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                <a id="round-history" className="opacity-0" href="/#">
                    {" "}
                </a>
            </div>
        </>
    );
};

export default UserHistory;
