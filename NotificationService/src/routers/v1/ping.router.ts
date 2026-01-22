import express from "express";
import { pingHandler } from "../../controllers/ping.controller";
import { validRequestBody } from "../../validators";
import { pingSchema } from "../../validators/ping.validator";

const router = express.Router();

router.get("/", validRequestBody(pingSchema), pingHandler);

export default router;
