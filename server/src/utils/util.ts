import { forOwn, groupBy } from "lodash";
import { TicketAttrs } from "../database/model/ticket/interface.enum";

export const generateSeed = () =>
    Math.floor(Math.random() * (99999999999 - 1000000) + 1000000);

export const getPlayersCount = (tickets?: TicketAttrs[]) => {
    if (!tickets || !tickets.length) return 0;
    const ticketsGroupbyOwner = groupBy(tickets, "owner");
    let counter = 0;
    forOwn(ticketsGroupbyOwner, (_value, _index) => {
        counter++;
    });

    return counter;
};
