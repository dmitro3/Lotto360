import { body } from "express-validator";

export const addRoundValidatorSchema = [
    body("endTime").not().isEmpty().withMessage("Title is required"),
    body("ticketPrice")
        .isFloat({ gt: 0 })
        .not()
        .isEmpty()
        .withMessage("Ticket price must be greater than 0"),
    body("bonusBnbAmount")
        .isFloat({ min: 0 })
        .not()
        .isEmpty()
        .withMessage("Bonus bnb amount price must be greater than 0"),
    body("bnbAddedFromLastRound")
        .isFloat({ min: 0 })
        .not()
        .isEmpty()
        .withMessage("Bnb from last round price must be greater than 0"),
    body("pools")
        .not()
        .isEmpty()
        .isArray({ max: 7, min: 7 })
        .withMessage("Pool should be exist with length of 7"),
];

export const updateRoundValidatorSchema = [
    body("endTime").not().isEmpty().withMessage("Title is required"),
    body("bonusBnbAmount")
        .isFloat({ min: 0 })
        .not()
        .isEmpty()
        .withMessage("Bonus bnb amount price must be greater than 0"),
    body("pools")
        .not()
        .isEmpty()
        .isArray({ max: 7, min: 7 })
        .withMessage("Pool should be exist with length of 7"),
];

export const getRoundSchema = [
    body("roundId").not().isEmpty().isInt({ gt: 0 }).withMessage("please enter round id"),
    body("address")
        .isEthereumAddress()
        .not()
        .isEmpty()
        .isString()
        .withMessage("please enter address"),
];
