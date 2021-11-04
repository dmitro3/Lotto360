import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { forOwn } from "lodash";

import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { HelperApiService } from "../../../api/helper.api.service";
import { CheckForWin } from "../../../api/models/round.model";
import TargetNavigation from "../shared/target.nav.link";

interface CheckWinProps {
    address: string;
}

const CheckWin: FunctionComponent<CheckWinProps> = ({ address }) => {
    const [loading, setIsloading] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [isLoose, setIsLoose] = useState(false);
    const [winObject, setWinObject] = useState<CheckForWin | undefined>();

    const checkForWin = () => {
        setIsloading(true);
        HelperApiService.checkForWin(address)
            .then((res) => {
                console.info(res.data.result);
                if (res && res.data && res.data.result) {
                    setWinObject(res.data.result);
                    setIsWin(true);
                    alert(`Total win ${res.data.result.totalWin.toFixed(3)} 🎉`);
                } else setIsLoose(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error("something went wrong please try again later");
            })
            .finally(() => setIsloading(false));
    };

    return (
        <div>
            <TargetNavigation id={"check-win"} />
            <div className="p-5 gradient-pink bg5 position-relative">
                <div className="container rounded p-4">
                    <h2 className="text-center fw-bold text-white">
                        Check for winning tickets
                    </h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <div
                            className={`max-content px-3 py-1 d-flex my-4 mb-2
                    justify-content-center align-items-center mx-auto rounded text-black ${
                        !winObject && "mb-5"
                    }`}
                        >
                            {loading && (
                                <i className="fa-duotone fa-question fa-xl fa-flash text-white spin"></i>
                            )}
                            {!isLoose ? (
                                <button
                                    type="button"
                                    disabled={loading || isWin}
                                    className="btn btn-lg btn-secondary mx-5"
                                    onClick={checkForWin}
                                >
                                    {!isWin && !loading && (
                                        <i className="fa-duotone fa-trophy fa-xl me-2"></i>
                                    )}
                                    {!isWin && !loading && "Check now"}
                                    {!isWin && loading && "wait ..."}
                                    {isWin && "you win"}
                                </button>
                            ) : (
                                <span className="text-white fs-5 fw-bold">
                                    💢 No winning ticket try your luck again 💢
                                </span>
                            )}
                            {loading && (
                                <i className="fa-duotone fa-question fa-xl fa-flash text-white"></i>
                            )}
                        </div>
                    </div>
                </div>
                {winObject && (
                    <table className="table table-bordered table-light bg-light fw-bold mb-5">
                        <thead>
                            <tr className="p-3">
                                <td className="p-3"># round</td>
                                <td className="p-3">pool</td>
                                <td className="p-3">ticket</td>
                                <td className="p-3">winning number</td>
                            </tr>
                        </thead>
                        <tbody>{makeTableRows(winObject)}</tbody>
                    </table>
                )}
                <div className="divider-history bg-dark"></div>
            </div>
        </div>
    );
};

export default CheckWin;

// .....................................................................................
const makeTableRows = (data: CheckForWin) => {
    let arrayElement: JSX.Element[] = [];
    data.briefs.forEach((brief) => {
        const { roundId, m1, m2, m3, m4, m5, m6, winningNumber } = brief;

        let isFirst = true;
        let total = 0;
        forOwn(brief, (value) => {
            // @ts-ignore
            if (value && value.tickets) {
                // @ts-ignore
                total += value.tickets.length;
            }
        });

        if (m1) {
            const array = renderTrArray(
                m1.tickets,
                isFirst,
                roundId,
                total,
                "1 match",
                winningNumber,
                m1.price
            );
            arrayElement = [...array];
            isFirst = false;
        }
        if (m2) {
            const array = renderTrArray(
                m2.tickets,
                isFirst,
                roundId,
                total,
                "2 match",
                winningNumber,
                m2.price
            );
            arrayElement = [...arrayElement, ...array];
            isFirst = false;
        }
        if (m3) {
            const array = renderTrArray(
                m3.tickets,
                isFirst,
                roundId,
                total,
                "3 match",
                winningNumber,
                m3.price
            );
            arrayElement = [...arrayElement, ...array];
            isFirst = false;
        }
        if (m4) {
            const array = renderTrArray(
                m4.tickets,
                isFirst,
                roundId,
                total,
                "4 match",
                winningNumber,
                m4.price
            );
            arrayElement = [...arrayElement, ...array];
            isFirst = false;
        }
        if (m5) {
            const array = renderTrArray(
                m5.tickets,
                isFirst,
                roundId,
                total,
                "5 match",
                winningNumber,
                m5.price
            );
            arrayElement = [...arrayElement, ...array];
            isFirst = false;
        }
        if (m6) {
            const array = renderTrArray(
                m6.tickets,
                isFirst,
                roundId,
                total,
                "All match",
                winningNumber,
                m6.price
            );
            arrayElement = [...arrayElement, ...array];
            isFirst = false;
        }
    });
    return arrayElement;
};

const renderTrArray = (
    tickets: number[],
    isFirst: boolean,
    roundId: number,
    totalRow: number,
    label: string,
    winningNumber: number,
    prize: number
) => {
    let arrayElement: JSX.Element[] = [];
    tickets.forEach((ticket, i) => {
        arrayElement.push(
            <tr key={i + label + roundId}>
                {isFirst && (
                    <td className="align-middle fw-bold p-3" rowSpan={totalRow}>
                        {roundId}
                    </td>
                )}
                {i === 0 && (
                    <td className="align-middle fw-bold p-3" rowSpan={tickets.length}>
                        {label}
                    </td>
                )}
                <td className="p-3">
                    {ticketNumToStr(ticket)}
                    <span className="ms-5">🏆 {prize.toFixed(3)} BNB claimed</span>
                </td>
                {isFirst && (
                    <td
                        className="align-middle text-success fw-bold p-3"
                        rowSpan={totalRow}
                    >
                        {ticketNumToStr(winningNumber)}
                    </td>
                )}
            </tr>
        );
        isFirst = false;
    });
    return arrayElement;
};
