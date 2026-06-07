import express from "express";
import cors from "cors";

import issueRoutes from "./routes/issue.routes";

import { errorHandler } from "./middlewares/error.middleware";

import commentRoutes from "./routes/comment.routes";

import analysisRoutes from "./routes/analysis.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Issue Management API Running",
  });
});

app.use("/api/issues", issueRoutes);

app.use(errorHandler);

app.use(
  "/api/issues/:issueId/comments",
  commentRoutes
);

app.use("/api/issues", analysisRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export default app;