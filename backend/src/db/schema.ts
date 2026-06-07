import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const issues = pgTable("issues", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  status: varchar("status", { length: 50 })
    .default("OPEN")
    .notNull(),

  priority: varchar("priority", { length: 50 })
    .default("MEDIUM")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),

  issueId: uuid("issue_id").notNull(),

  content: text("content").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const analyses = pgTable("analyses", {
  id: uuid("id").defaultRandom().primaryKey(),

  issueId: uuid("issue_id").notNull(),

  summary: text("summary").notNull(),

  recommendation: text("recommendation").notNull(),

  generatedAt: timestamp("generated_at")
    .defaultNow()
    .notNull(),
});