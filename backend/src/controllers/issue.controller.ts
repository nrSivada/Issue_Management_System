import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  deleteIssue,
} from "../services/issue.service";

import { createIssueSchema } from "../validations/issue.validation";

export const createIssueHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createIssueSchema.parse(req.body);

    const {
      title,
      description,
      priority,
    } = validatedData;

    const issue = await createIssue(
      title,
      description,
      priority
    );

    res.status(201).json(issue);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Failed to create issue",
    });
  }
};

export const getIssuesHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const issues = await getAllIssues();

    res.json(issues);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch issues",
    });
  }
};

export const getIssueByIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const issue = await getIssueById(id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    res.json(issue);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch issue",
    });
  }
};

export const updateIssueHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const { status } = req.body;

    const issue = await updateIssueStatus(
      id,
      status
    );

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    res.json(issue);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update issue",
    });
  }
};

export const deleteIssueHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const issue = await deleteIssue(id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    res.json({
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete issue",
    });
  }
};