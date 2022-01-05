import { model, Schema } from "mongoose";
import { PaymentAttrs, PaymentDoc, PaymentModel } from "./interface";

const paymentSchema = new Schema(
    {
        amount: { type: Number, required: true },
        address: { type: String, required: true },
        transaction: { type: String, required: true, unique: true, index: true },
    },
    {
        timestamps: { createdAt: "date" },
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

paymentSchema.statics.build = (attrs: PaymentAttrs) => new Payment(attrs);
export const Payment = model<PaymentDoc, PaymentModel>("Payment", paymentSchema);
