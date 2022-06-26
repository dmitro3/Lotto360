import { ethers } from "ethers";
import { Telegraf } from "telegraf";
import {
    DICE360_CONTRACT_ADDRESS,
    FRUITLAND_CONTRACT_ADDRESS,
    NUMBEROFTHEBEAST_CONTRACT_ADDRESS,
} from "../config/blockchain.configs";
import { BOT_TOKEN, CHAT_ID } from "../config/configs";
import { provider } from "../provider/contracts";

const bot = new Telegraf(BOT_TOKEN);

export const Telegram = {
    sendMessage: async () => {
        try {
            const beastBalance = await provider.getBalance(NUMBEROFTHEBEAST_CONTRACT_ADDRESS);
            const diceBalance = await provider.getBalance(DICE360_CONTRACT_ADDRESS);
            const fruitBalance = await provider.getBalance(FRUITLAND_CONTRACT_ADDRESS);

            const total = beastBalance.add(diceBalance).add(fruitBalance);

            bot.telegram
                .sendMessage(CHAT_ID, `New balance: ${ethers.utils.formatEther(total)}`)
                .then((res) => console.info("messageId:", res.message_id))
                .catch((err) => console.error(err));
        } catch (err) {
            console.error(err);
        }
    },
};
