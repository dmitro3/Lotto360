require("dotenv").config();
import { connectToMongodb } from "./database/database";

const startUp = async () => {
    connectToMongodb();
    /**   const testQueue = new Queue("test", { redis: { host: "redis", port: 6379 } });
    testQueue.add([666, 777], { delay: 5000 });
    // testQueue.removeJobs("*");
    testQueue.process((job, done) => {
        console.info(job.data);
        done();
    });
    */
};

startUp();
