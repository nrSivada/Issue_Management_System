import { Router } from "express";

import {
  createIssueHandler,
  getIssuesHandler,
  getIssueByIdHandler,
  updateIssueHandler,
  deleteIssueHandler,
} from "../controllers/issue.controller";

const router = Router();

/**
 * @swagger
 * /api/issues:
 *   post:
 *     summary: Create a new issue
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Issue created
 */

router.post("/", createIssueHandler);

/**
 * @swagger
 * /api/issues:
 *   get:
 *     summary: Get all issues
 *     responses:
 *       200:
 *         description: List of issues
 */

router.get("/", getIssuesHandler);

router.get("/:id", getIssueByIdHandler);

router.patch("/:id", updateIssueHandler);

router.delete("/:id", deleteIssueHandler);

export default router;