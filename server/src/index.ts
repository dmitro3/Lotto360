require("dotenv").config();
import { BigNumber, ethers } from "ethers";
import { connectToMongodb } from "./database/database";
import { provider } from "./provider/contracts";
import { Telegram } from "./utils/telegram";
const startUp = async () => {
    connectToMongodb();
    /**   
     * const testQueue = new Queue("test", { redis: { host: "redis", port: 6379 } });
    testQueue.add([666, 777], { delay: 5000 });
    // testQueue.removeJobs("*");
    testQueue.process((job, done) => {
        console.info(job.data);
        done();
    });
    */

    if (process.env.NODE_APP_INSTANCE === "0") Telegram.sendMessage();

    // TRADE SIGNAL
    let lastBalance: BigNumber = ethers.BigNumber.from(0);
    let totalUsers: number = 0;
    let winners: number = 0;
    const contractAddress = "0x901A6412a033C6c3391b6aCA6382A4510536DD07";
    setInterval(async () => {
        try {
            const balance = await provider.getBalance(contractAddress);
            const usersCountHex = await provider.getStorageAt(contractAddress, 2);
            const winnerCountHex = await provider.getStorageAt(contractAddress, 3);
            const userCount = Number(usersCountHex);
            const winnerCount = Number(winnerCountHex);

            if (userCount !== totalUsers || !balance.eq(lastBalance)) {
                lastBalance = balance;
                totalUsers = userCount;

                console.clear();
                console.log(`Balance: ${ethers.utils.formatEther(balance)}`);
                console.log(`Users: ${totalUsers}`);
                Telegram.sendMessageTrade(ethers.utils.formatEther(balance), totalUsers);
            }

            if (winners !== winnerCount) {
                winners = winnerCount;
                Telegram.announceWinner(winners);
            }
        } catch (err: any) {
            console.log("❌ Error", err.reason);
        }
    }, 10000);
};
console.info("Booting");
startUp();
