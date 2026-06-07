import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(
      3,
      "Comment must be at least 3 characters"
    ),
});