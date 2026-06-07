import express from "express";
import cors from "cors";

import issueRoutes from "./routes/issue.routes";
import commentRoutes from "./routes/comment.routes";
import analysisRoutes from "./routes/analysis.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://issue-management-system-2hyh.onrender.com"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Issue Management API Running"
  });
});

app.use("/api/issues", issueRoutes);
app.use("/api/issues/:issueId/comments", commentRoutes);
app.use("/api/issues", analysisRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);

export default app;