import express, { Request, Response } from "express";

import { requireAuth } from "../../../../middlewares/require-auth";
import { lotto360Contract } from "../../../../provider/contracts";
import { responseMaker } from "../../../response.maker";

const router = express.Router();

router.get("/api/getsettings", requireAuth, async (req: Request, res: Response) => {
    try {
        const result = await lotto360Contract.getSettings();

        res.status(200).send(
            responseMaker({
                success: true,
                result: result,
            })
        );
    } catch (err: any) {
        console.info(err);
        throw err;
    }
});

export { router as getSettingsRouter };