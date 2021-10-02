import { connectToMongodb } from "./database/database";

const startUp = () => {
    connectToMongodb();
};

startUp();
