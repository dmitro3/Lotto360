import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";

import { ResponseMessageType } from "../../../middlewares/error-handler";
import { BadRequestError } from "../../../errors/bad-request-error";
import { User } from "../../../database/model/user/user";
import { Password } from "../../../auth/password";
import { JWT_KEY } from "../../../config/configs";

const router = express.Router();

// route action ----------------------------------------------------------------
router.post("/api/admin/signin", async (req: Request, res: Response) => {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (!existingUser)
        throw new BadRequestError("Invalid credentials", ResponseMessageType.ERROR);

    const isPasswordMatch = await Password.compare(existingUser.password, password);
    if (!isPasswordMatch)
        throw new BadRequestError("Invalid credentials", ResponseMessageType.ERROR);

    existingUser.password = "";

    // generate JWT
    const userJwt = jwt.sign({ id: existingUser._id, name: existingUser.name }, JWT_KEY);

    res.header("Access-Control-Expose-Headers", "jwt");
    res.status(200)
        .setHeader("jwt", userJwt)
        .send({ result: { id: existingUser._id, name: existingUser.name } });
});

export { router as signinRouter };
