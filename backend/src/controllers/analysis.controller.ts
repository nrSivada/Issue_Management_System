import { Request, Response } from "express";

import { getIssueById } from "../services/issue.service";

import {
  analyzeIssueWithAI,
  saveAnalysis,
} from "../services/analysis.service";

export const analyzeIssueHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const issueId =
        req.params.id as string;

      const issue =
        await getIssueById(issueId);

      if (!issue) {
        return res.status(404).json({
          message: "Issue not found",
        });
      }

      const analysis =
        await analyzeIssueWithAI(
          issue.title,
          issue.description
        );

      const saved =
        await saveAnalysis(
          issueId,
          analysis.summary,
          analysis.recommendation
        );

      res.json(saved);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Analysis failed",
      });
    }
  };