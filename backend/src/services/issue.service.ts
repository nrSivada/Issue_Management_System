import { db } from "../db";
import { issues } from "../db/schema";
import { eq } from "drizzle-orm";

export const createIssue = async (
  title: string,
  description: string,
  priority: string
) => {
  const result = await db
    .insert(issues)
    .values({
      title,
      description,
      priority,
    })
    .returning();

  return result[0];
};

export const getAllIssues = async () => {
  return await db.select().from(issues);
};

export const getIssueById = async (id: string) => {
  const result = await db
    .select()
    .from(issues)
    .where(eq(issues.id, id));

  return result[0];
};

export const updateIssueStatus = async (
  id: string,
  status: string
) => {
  const result = await db
    .update(issues)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(issues.id, id))
    .returning();

  return result[0];
};

export const deleteIssue = async (id: string) => {
  const result = await db
    .delete(issues)
    .where(eq(issues.id, id))
    .returning();

  return result[0];
};