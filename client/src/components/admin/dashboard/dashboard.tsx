import { FunctionComponent, useEffect, useState } from "react";
import { HelperApiService } from "../../../api/helper.api.service";
import { DashboardModel } from "../../../interfaces/dashboard";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
    const [dashboardStats, setDashboardStats] = useState<DashboardModel>();

    useEffect(() => {
        HelperApiService.getDashboardStats()
            .then((res) => {
                if (res && res.data && res.data.result)
                    setDashboardStats(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!dashboardStats) return <></>;

    const {
        contractBalance,
        currentRoundBalance,
        totalWithdraws,
        treasuryBalance,
        winnersBalance,
    } = dashboardStats;

    return (
        <div>
            <div>
                <span>Current round balance: {currentRoundBalance}</span>
            </div>
            <div>
                <span>Contract balance: {contractBalance}</span>
            </div>
            <div>
                <span>Total wins: {winnersBalance}</span>
            </div>
            <div>
                <span>Treasury balance: {treasuryBalance}</span>
            </div>
            <div>
                <span>Total withdraw: {totalWithdraws}</span>
            </div>
            <div>
                <span>Available for withdraw: {treasuryBalance - totalWithdraws}</span>
            </div>
        </div>
    );
};

export default Dashboard;
