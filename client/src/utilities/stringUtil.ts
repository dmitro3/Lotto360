import { groupBy, forOwn } from "lodash";
import { TicketAttrs } from "../api/models/round.model";

const stringUtils = {
    simplifyString: (text: string): string => {
        if (text.length < 15) return text;
        const firstPart = text.substring(0, 4);
        const secondPart = text.substring(text.length - 4);
        return `${firstPart}...${secondPart}`;
    },
};

const currencyFormat = (num: number, prefix: string) =>
    `${prefix} ` + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

const getTicketCount = (tickets?: TicketAttrs[]) =>
    tickets && tickets?.length > 0 ? tickets.length : 0;

const getPlayersCount = (tickets?: TicketAttrs[]) => {
    if (!tickets || !tickets.length) return 0;
    const ticketsGroupbyOwner = groupBy(tickets, tickets[0].owner);
    let counter = 0;
    forOwn(ticketsGroupbyOwner, (_value, _index) => {
        counter++;
    });

    return counter;
};

export { currencyFormat, getPlayersCount, getTicketCount, stringUtils };
