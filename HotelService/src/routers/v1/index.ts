import express from "express";
import pingRouter from "./ping.router";

const router = express.Router();

router.use("/ping", pingRouter);

export default router;
