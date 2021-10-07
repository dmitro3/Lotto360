import { FunctionComponent } from "react";
import { PoolAttrs } from "../../../api/models/round.model";
import { currencyFormat } from "../../../utilities/stringUtil";

interface PrizeBoxProps {
    amount: number;
    pools: PoolAttrs[];
}

const PrizeBox: FunctionComponent<PrizeBoxProps> = ({ amount, pools }) => {
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
                                for (let i = 0; i < pools.length; i++) {
                                    row.push(
                                        <i
                                            key={pools.length * i + 30}
                                            className="fa-solid fa-square text-success mx-1"
                                        ></i>
                                    );
                                }
                                return row;
                            })}
                            {runCallback(() => {
                                const row = [];
                                for (let i = 0; i < 6 - pools.length; i++) {
                                    row.push(
                                        <i
                                            key={pools.length * i + 30}
                                            className="fa-duotone fa-xmark text-danger mx-1"
                                        ></i>
                                    );
                                }
                                return row;
                            })}
                        </div>
                    </div>
                    <div className="card-body d-flex justify-content-left align-items-center">
                        <span className="fw-bold fs-6 me-2">
                            {currencyFormat((pool.percentage * amount) / 100, "BNB")}
                        </span>
                        <span className="text-muted">~ $145,550</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PrizeBox;
