import { Document, Model } from "mongoose";

enum PoolName {
    Match1,
    Match2,
    Match3,
    Match4,
    Match5,
    Match6,
    Treasury,
}

interface PoolAttrs {
    name: PoolName;
    percentage: number;
}

interface PoolDoc extends Document {
    name: PoolName;
    percentage: number;
}

interface PoolModel extends Model<PoolDoc> {
    build(attrs: PoolAttrs): PoolDoc;
}

export { PoolAttrs, PoolDoc, PoolModel, PoolName };
