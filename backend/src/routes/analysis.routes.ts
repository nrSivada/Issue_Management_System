import { Router } from "express";

import {
  analyzeIssueHandler,
} from "../controllers/analysis.controller";

const router = Router();

router.post(
  "/:id/analyze",
  analyzeIssueHandler
);

export default router;