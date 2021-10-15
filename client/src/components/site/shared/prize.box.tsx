import { FunctionComponent } from "react";
import { currencyFormat, ticketNumToStr } from "../../../utilities/string.numbers.util";
import { PoolAttrs, RoundStatus, TicketAttrs } from "../../../api/models/round.model";

interface PrizeBoxProps {
    status: RoundStatus;
    amount: number;
    bnbPrice: number;
    pools: PoolAttrs[];
    finalNumber: number;
    tickets?: TicketAttrs[];
}

const PrizeBox: FunctionComponent<PrizeBoxProps> = ({
    status,
    amount,
    bnbPrice,
    pools,
    finalNumber,
    tickets,
}) => {
    const runCallback = (cb: any) => {
        return cb();
    };

    const winningTicketsCount: number[] = calculateWinningTicketCounts(
        finalNumber,
        tickets
    );

    return (
        <>
            {pools.map((pool, i) => (
                <div key={i} className="card border-secondary my-1 border border-2 mx-1">
                    <div className="card-header d-flex flex-column justify-content-between align-items-center">
                        <span className="fw-bold fs-6">
                            {i + 1 === 7 ? "Treasury" : `${i + 1} Match`}
                        </span>
                        <div className="d-flex">
                            {runCallback(() => {
                                const row = [];
                                for (let j = 0; j <= pool.name && i < 6; j++) {
                                    row.push(
                                        <i
                                            key={pools.length * j + 30}
                                            className="fa-solid fa-square text-success mx-1"
                                        ></i>
                                    );
                                }
                                if (i === 6)
                                    row.push(
                                        <i
                                            key={pools.length * 98 + 30}
                                            className="fa-duotone fa-box-dollar text-warning mx-1"
                                        ></i>
                                    );
                                return row;
                            })}
                            {runCallback(() => {
                                const row = [];
                                for (let j = 0; j < 5 - pool.name; j++) {
                                    row.push(
                                        <i
                                            key={pools.length * j + 30}
                                            className="fa-duotone fa-xmark text-danger mx-1"
                                        ></i>
                                    );
                                }
                                return row;
                            })}
                        </div>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-left align-items-center">
                        <span className="fw-bold fs-6">
                            {currencyFormat((pool.percentage * amount) / 100, "BNB")}
                        </span>
                        <span className="text-muted">
                            {currencyFormat(
                                (pool.percentage * amount * bnbPrice) / 100,
                                "$"
                            )}
                        </span>
                        {winningTicketsCount[i] >= 0 && status === RoundStatus.Close && (
                            <span className="text-dark fw-bold">
                                {winningTicketsCount[i]}{" "}
                                {winningTicketsCount[i] > 1 ? "tickets" : "ticket"}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default PrizeBox;

// ..........................................................................................
function calculateWinningTicketCounts(
    finalNumber: number,
    tickets: TicketAttrs[] | undefined
): number[] {
    if (!tickets || tickets.length === 0 || !finalNumber) return [];
    else {
        const winNumber = ticketNumToStr(finalNumber);
        const ticketsArray = tickets.map((t) => ticketNumToStr(t.number));
        let alreadyWon: string[] = [];

        const match6Array = ticketsArray.filter((t) => t === winNumber);
        alreadyWon = [...match6Array];

        const match5Array = ticketsArray.filter((t) =>
            winningCondition(t, winNumber, -1, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match5Array];

        const match4Array = ticketsArray.filter((t) =>
            winningCondition(t, winNumber, -2, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match4Array];

        const match3Array = ticketsArray.filter((t) =>
            winningCondition(t, winNumber, -3, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match3Array];

        const match2Array = ticketsArray.filter((t) =>
            winningCondition(t, winNumber, -4, alreadyWon)
        );
        alreadyWon = [...alreadyWon, ...match2Array];

        const match1Array = ticketsArray.filter((t) =>
            winningCondition(t, winNumber, -5, alreadyWon)
        );

        return [
            match1Array.length,
            match2Array.length,
            match3Array.length,
            match4Array.length,
            match5Array.length,
            match6Array.length,
        ];
    }
}

const winningCondition = (
    targetNumber: string,
    winNumber: string,
    sliceNumber: number,
    alreadyWon: string[]
) =>
    targetNumber.slice(0, sliceNumber) === winNumber.slice(0, sliceNumber) &&
    !alreadyWon.includes(targetNumber);
