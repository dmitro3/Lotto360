import { connectToMongodb } from "./database/database";
import { lotto360Contract } from "./provider/contracts";

const startUp = async () => {
    connectToMongodb();
};

startUp();
