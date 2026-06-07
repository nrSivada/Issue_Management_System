import { Router } from "express";

import {
  createCommentHandler,
  getCommentsHandler,
} from "../controllers/comment.controller";

const router = Router({ mergeParams: true });

router.post("/", createCommentHandler);

router.get("/", getCommentsHandler);

export default router;