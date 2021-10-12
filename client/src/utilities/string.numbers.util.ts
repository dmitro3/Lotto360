import { groupBy, forOwn } from "lodash";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { TicketAttrs } from "../api/models/round.model";

// ..........................................................................................
const simplifyString = (text: string): string => {
    if (text.length < 15) return text;
    const firstPart = text.substring(0, 4);
    const secondPart = text.substring(text.length - 4);
    return `${firstPart}...${secondPart}`;
};

// ..........................................................................................
const currencyFormat = (num: number, prefix: string) =>
    `${prefix} ` + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

// ..........................................................................................
const ticketNumToStr = (num: number) => num.toString().substring(1);

// ..........................................................................................
const getTicketCount = (tickets?: TicketAttrs[]) =>
    tickets && tickets?.length > 0 ? tickets.length : 0;

// ..........................................................................................
const getPlayersCount = (tickets?: TicketAttrs[]) => {
    if (!tickets || !tickets.length) return 0;
    const ticketsGroupbyOwner = groupBy(tickets, "owner");
    let counter = 0;
    forOwn(ticketsGroupbyOwner, (_value, _index) => {
        counter++;
    });

    return counter;
};

const rnd = () => Math.floor(Math.random() * (9 + 1));

// ..........................................................................................
const get6DigitsRandomString = () => `${rnd()}${rnd()}${rnd()}${rnd()}${rnd()}${rnd()}`;

// ..........................................................................................
const bnToNumber = (bn: BigNumber) => {
    try {
        return parseFloat(ethers.utils.formatEther(bn));
    } catch {
        return 0;
    }
};

// ..........................................................................................
const ticketNumberIsValid = (value: string) => {
    try {
        if (value === "") return true;
        if (value.length > 6) return false;
        const number = parseInt(value);
        if (number >= 0 && number < 1000000) return true;
        return false;
    } catch {
        return false;
    }
};

export {
    get6DigitsRandomString,
    bnToNumber,
    ticketNumberIsValid,
    currencyFormat,
    getPlayersCount,
    getTicketCount,
    simplifyString,
    ticketNumToStr,
};
