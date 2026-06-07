import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  createComment,
  getCommentsByIssueId,
} from "../services/comment.service";

import { createCommentSchema } from "../validations/comment.validation";

export const createCommentHandler = async (
  req: Request,
  res: Response
) => {
  console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);
  try {
    const { content } =
      createCommentSchema.parse(req.body);

    const issueId = req.params.issueId as string;

    const comment = await createComment(
      issueId,
      content
    );

    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Failed to create comment",
    });
  }
};

export const getCommentsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const issueId = req.params.issueId as string;

    const comments =
      await getCommentsByIssueId(issueId);

    res.json(comments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};