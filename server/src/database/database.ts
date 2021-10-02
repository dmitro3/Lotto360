import mongoose from "mongoose";
import { app } from "../app";
import { MONGODB_URI } from "../settings/app.settings";

export const connectToMongodb = () => {
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.clear();
            console.log("✅ Connected to MongoDb");
            app.listen(3000, () => console.log("✅ Listening on port 3000"));
        })
        .catch((err) => console.log(err));
};
