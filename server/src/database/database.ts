import mongoose from "mongoose";

import { app } from "../app";
import { ADMIN_PASSWORD, ADMIN_USERNAME, MONGODB_URI } from "../config/configs";
import { User } from "./model/user/user";

export const connectToMongodb = () => {
    mongoose
        .connect(MONGODB_URI)
        .then(async () => {
            console.clear();
            console.log("✅ Connected to MongoDb");

            const admin = await User.findOne({ name: ADMIN_USERNAME });
            if (!admin) {
                const adminModel = User.build({
                    name: ADMIN_USERNAME,
                    password: ADMIN_PASSWORD,
                });
                await adminModel.save();
                console.info("🟢 seed admin to database");
            }

            app.listen(3001, () => console.log("✅ Listening on port 3001"));
        })
        .catch((err) => console.log(err));
};
