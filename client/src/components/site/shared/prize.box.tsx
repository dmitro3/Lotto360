import { FunctionComponent } from "react";
import { currencyFormat } from "../../../utilities/string.numbers.util";
import { PoolAttrs, PoolWinnersAttr } from "../../../api/models/round.model";

interface PrizeBoxProps {
    amount: number;
    bnbPrice: number;
    pools: PoolAttrs[];
    poolWinners?: PoolWinnersAttr;
}

const PrizeBox: FunctionComponent<PrizeBoxProps> = ({
    amount,
    bnbPrice,
    pools,
    poolWinners,
}) => {
    const runCallback = (cb: any) => {
        return cb();
    };

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
                        {poolWinners && i < 6 && (
                            <span className="text-dark fw-bold">
                                {Object.values(poolWinners)[i] &&
                                    Object.values(poolWinners)[i].length}{" "}
                                {Object.values(poolWinners)[i] &&
                                Object.values(poolWinners)[i].length > 1
                                    ? "tickets"
                                    : "ticket"}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default PrizeBox;
