import { FunctionComponent, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { HelperApiService } from "../../../api/helper.api.service";
import { DashboardModel } from "../../../interfaces/dashboard";

const { Chart } = require("react-google-charts");

interface DashboardProps {
    beastBalance: string;
    diceBalance: string;
    fruitBalance: string;
    overalBalance: string;
}

const Dashboard: FunctionComponent<DashboardProps> = ({
    beastBalance,
    diceBalance,
    fruitBalance,
    overalBalance,
}) => {
    const [dashboardStats, setDashboardStats] = useState<DashboardModel>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        HelperApiService.getDashboardStats()
            .then((res) => {
                if (res && res.data && res.data.result)
                    setDashboardStats(res.data.result);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="ps-3 pt-3 d-flex justify-content-center align-items-center">
                <HashLoader />
            </div>
        );
    }

    const objectArray = [
        { header: "Overal Balance:", text: overalBalance },
        { header: "Beast Balance:", text: beastBalance },
        { header: "Dice Balance:", text: diceBalance },
        { header: "Fruit Balance:", text: fruitBalance },
    ];

    const headBalance = (
        <div style={{ maxWidth: "20rem" }}>
            {objectArray.map((a, i) => (
                <div
                    key={i}
                    className="card bg-select-game text-black mb-3 border-0 rounded shadow overflow-hidden"
                >
                    <div className="card-header bg-tranparent fw-bold">{a.header}</div>
                    <div className="card-body">
                        <h5 className="fw-bold mb-0">{a.text}</h5>
                    </div>
                </div>
            ))}
        </div>
    );

    if (!dashboardStats) return headBalance;

    const {
        contractBalance,
        currentRoundBalance,
        totalWithdraws,
        treasuryBalance,
        winnersBalance,
    } = dashboardStats;

    return (
        <div>
            {headBalance}
            <h4 className="fw-bold mb-3">Stats:</h4>
            <div className="bg-light rounded">
                <div className="px-3 py-2 fw-bold fs-6">
                    <div className="mb-2">
                        <i className="fa-solid fa-circle me-2 text-success"></i>
                        <span>Current round balance:</span>
                        <span className="ms-3 rounded text-white bg-success px-2">
                            {currentRoundBalance.toFixed(5)}
                        </span>
                    </div>
                    <div className="mb-2">
                        <i className="fa-solid fa-file-contract me-2 text-success"></i>
                        <span>Contract balance: </span>
                        <span className="ms-3 rounded text-white bg-success px-2">
                            {contractBalance.toFixed(5)}
                        </span>
                    </div>
                    <div className="mb-2">
                        <i className="fa-solid fa-circle-dollar me-2 text-success"></i>
                        <span>Total wins: </span>
                        <span className="ms-3 rounded text-white bg-success px-2">
                            {winnersBalance.toFixed(5)}
                        </span>
                    </div>
                    <div className="mb-2">
                        <i className="fa-solid fa-box-heart me-2 text-primary"></i>
                        <span>Treasury total: </span>
                        <span className="ms-3 rounded text-white bg-success px-2">
                            {treasuryBalance.toFixed(5)}
                        </span>
                    </div>
                    <div className="mb-2">
                        <i className="fa-solid fa-hands-holding-dollar me-2 text-primary"></i>
                        <span>Total withdraw: </span>
                        <span className="ms-3 rounded text-white bg-success px-2">
                            {totalWithdraws.toFixed(5)}
                        </span>
                    </div>
                    <div>
                        <i className="fa-solid fa-hand-holding-dollar me-2 text-primary"></i>
                        <span>Available for withdraw:</span>
                        <span className="ms-3 rounded text-white bg-success px-2">
                            {(treasuryBalance - totalWithdraws).toFixed(5)}
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-around mt-5">
                    <div className="d-flex flex-column">
                        <div className="rounded overflow-hidden mb-2 border">
                            <Chart
                                width={"500px"}
                                height={"300px"}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ["Treasury", "Amount"],
                                    [
                                        "Treasury available",
                                        treasuryBalance - totalWithdraws,
                                    ],
                                    ["Total withdraws", totalWithdraws],
                                ]}
                                options={{
                                    title: "Treasury Balance",
                                    backgroundColor: "#f6f6f6",
                                    is3D: true,
                                }}
                            />
                        </div>
                        <p>Treasury available is ready for withdraw</p>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="rounded overflow-hidden mb-2 border">
                            <Chart
                                width={"500px"}
                                height={"300px"}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ["Category", "Amount"],
                                    ["Current round", currentRoundBalance],
                                    ["Winners", winnersBalance],
                                    ["Treasury", treasuryBalance],
                                    ["Contract", contractBalance],
                                ]}
                                options={{
                                    title: "Contract Stats",
                                    backgroundColor: "#f6f6f6",
                                    is3D: true,
                                }}
                            />
                        </div>
                        <p>Contract should be equal to current round at least</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
