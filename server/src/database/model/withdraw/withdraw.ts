import { model, Schema } from "mongoose";
import { WithdrawAttrs, WithdrawDoc, WithdrawModel } from "./interface";

const withdrawSchema = new Schema({
    amount: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
});

withdrawSchema.statics.build = (attrs: WithdrawAttrs) => new Withdraw(attrs);
const Withdraw = model<WithdrawDoc, WithdrawModel>("Withdraw", withdrawSchema);

export { Withdraw, withdrawSchema };
