import { Document, Model } from "mongoose";

export interface PaymentAttrs {
    date?: Date;
    amount: number;
    address: string;
    transaction: string;
}

export interface PaymentDoc extends Document {
    date?: Date;
    amount: number;
    address: string;
    transaction: string;
}

export interface PaymentModel extends Model<PaymentDoc> {
    biuld(attrs: PaymentAttrs): PaymentDoc;
}
