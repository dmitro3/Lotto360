import express from "express";
import { currentUser } from "../../../middlewares/current-user";
import { requireAuth } from "../../../middlewares/require-auth";

const router = express.Router();

router.get("/api/admin/currentuser", currentUser, requireAuth, (req, res) => {
    res.send({ result: req.currentUser || null });
});

export { router as currentUserRouter };
