import { model, Model, Document, Schema } from "mongoose";

interface RoundAttrs {}

interface RoundDoc extends Document {}

interface RoundModel extends Model<RoundDoc> {
    build(attrs: RoundAttrs): RoundDoc;
}

const roundSchema = new Schema(
    {},
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

roundSchema.static.build = (attrs: RoundAttrs) => new Round(attrs);
const Round = model<RoundDoc, RoundModel>("Round", roundSchema);

export { Round };
