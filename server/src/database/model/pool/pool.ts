import { model, Schema } from "mongoose";
import { PoolAttrs, PoolDoc, PoolModel, PoolName } from "./interface.enum";

const poolSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            enum: Object.values(PoolName),
        },
        percentage: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

poolSchema.statics.build = (attrs: PoolAttrs) => new Pool(attrs);
const Pool = model<PoolDoc, PoolModel>("Pool", poolSchema);

export { Pool, poolSchema };
