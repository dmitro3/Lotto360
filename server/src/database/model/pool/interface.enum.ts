import { Document, Model } from "mongoose";
import { WinningTicketAttrs } from "../ticket/interface.enum";

enum PoolName {
    Match1,
    Match2,
    Match3,
    Match4,
    Match5,
    Match6,
    Treasury,
}

interface PoolWinnersAttr {
    match1?: WinningTicketAttrs[];
    match2?: WinningTicketAttrs[];
    match3?: WinningTicketAttrs[];
    match4?: WinningTicketAttrs[];
    match5?: WinningTicketAttrs[];
    match6?: WinningTicketAttrs[];
}

interface PoolWinnersDoc extends Document {
    match1?: WinningTicketAttrs[];
    match2?: WinningTicketAttrs[];
    match3?: WinningTicketAttrs[];
    match4?: WinningTicketAttrs[];
    match5?: WinningTicketAttrs[];
    match6?: WinningTicketAttrs[];
}

interface PoolWinnersModel extends Model<PoolWinnersDoc> {
    build(attrs: PoolWinnersAttr): PoolWinnersDoc;
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

export {
    PoolAttrs,
    PoolDoc,
    PoolModel,
    PoolName,
    PoolWinnersAttr,
    PoolWinnersDoc,
    PoolWinnersModel,
};
