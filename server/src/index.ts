import { connectToMongodb } from "./database/database";

const startUp = async () => {
    connectToMongodb();
};

startUp();
