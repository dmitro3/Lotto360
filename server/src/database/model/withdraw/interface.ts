import { Document, Model } from "mongoose";

interface WithdrawAttrs {
    amount: string;
    recipient: string;
    time: Date;
}

interface WithdrawDoc extends Document {
    amount: string;
    recipient: string;
    time: Date;
}

interface WithdrawModel extends Model<WithdrawDoc> {
    build(attrs: WithdrawAttrs): WithdrawDoc;
}

export { WithdrawAttrs, WithdrawDoc, WithdrawModel };
