import { db } from "../db";
import { comments } from "../db/schema";
import { eq } from "drizzle-orm";

export const createComment = async (
  issueId: string,
  content: string
) => {
  const result = await db
    .insert(comments)
    .values({
      issueId,
      content,
    })
    .returning();

  return result[0];
};

export const getCommentsByIssueId = async (
  issueId: string
) => {
  return await db
    .select()
    .from(comments)
    .where(eq(comments.issueId, issueId));
};