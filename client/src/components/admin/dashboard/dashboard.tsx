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

    if (loading)
        return (
            <div className="ps-3 pt-3 d-flex justify-content-center align-items-center">
                <HashLoader />
            </div>
        );

    const headBalance = (
        <>
            <h4 className="mb-3">
                Overal Balance: <span className="text-dark fw-bold">{overalBalance}</span>
            </h4>
            <h6 className="mb-1">
                Beast Balance: <span className="fw-bold text-dark">{beastBalance}</span>
            </h6>
            <h6 className="mb-1">
                Dice Balance: <span className="fw-bold text-dark">{diceBalance}</span>
            </h6>
            <h6 className="mb-1">
                Fruit Balance: <span className="fw-bold text-dark">{fruitBalance}</span>
            </h6>
        </>
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
