import { FunctionComponent } from "react";

interface PrizeBoxProps {}

const prizeBoxArray = [1, 2, 3, 4, 5, 6];

const PrizeBox: FunctionComponent<PrizeBoxProps> = () => {
    const runCallback = (cb: any) => {
        return cb();
    };

    return (
        <>
            {prizeBoxArray.map((num, i) => (
                <div key={i} className="card border-secondary my-1 border border-2 mx-1">
                    <div className="card-header d-flex flex-column justify-content-between align-items-center">
                        <span className="fw-bold fs-6">{`${num} Match`}</span>
                        <div className="d-flex">
                            {runCallback(() => {
                                const row = [];
                                for (let i = 0; i < num; i++) {
                                    row.push(
                                        <i
                                            key={num * i + 30}
                                            className="fa-solid fa-square text-success mx-1"
                                        ></i>
                                    );
                                }
                                return row;
                            })}
                            {runCallback(() => {
                                const row = [];
                                for (let i = 0; i < 6 - num; i++) {
                                    row.push(
                                        <i
                                            key={num * i + 30}
                                            className="fa-duotone fa-xmark text-danger mx-1"
                                        ></i>
                                    );
                                }
                                return row;
                            })}
                        </div>
                    </div>
                    <div className="card-body d-flex justify-content-left align-items-center">
                        <span className="fw-bold fs-6 me-2">450 BNB</span>
                        <span className="text-muted fw-bold">~ $145,550</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PrizeBox;
