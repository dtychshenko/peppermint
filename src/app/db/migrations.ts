import crypto from "node:crypto";
import { type Migrations } from "rwsdk/db";

export const migrations = {
  "001_initial_schema": {
    async up(db) {
      return [
        await db.schema
          .createTable("transactions")
          .addColumn("id", "text", (col) => col.primaryKey())
          .addColumn("date", "integer", (col) => col.notNull())
          .addColumn("amount", "real", (col) => col.notNull())
          .addColumn("categoryId", "text")
          .addColumn("payee", "text", (col) => col.notNull())
          .addColumn("source", "text", (col) => col.notNull())
          .addColumn("status", "text", (col) => col.notNull())
          .addColumn("notes", "text")
          .addColumn("createdDateTime", "integer", (col) => col.notNull())
          .addColumn("updatedDateTime", "integer", (col) => col.notNull())
          .addColumn("metadata", "blob")
          .addForeignKeyConstraint("categories", ["categoryId"], "categories", ["id"])
          .execute(),

        await db.schema
          .createTable("categories")
          .addColumn("id", "text", (col) => col.primaryKey())
          .addColumn("name", "text", (col) => col.notNull())
          .addColumn("description", "text")
          .addColumn("createdDateTime", "integer", (col) => col.notNull())
          .addColumn("updatedDateTime", "integer", (col) => col.notNull())
          .execute(),

        await db.schema
          .createTable("predictions")
          .addColumn("id", "text", (col) => col.primaryKey())
          .addColumn("transactionId", "text", (col) => col.notNull())
          .addColumn("categoryId", "text", (col) => col.notNull())
          .addColumn("confidence", "real")
          .addColumn("model", "text", (col) => col.notNull())
          .addColumn("inferenceLatencyMs", "integer")
          .addColumn("predictedDateTime", "integer")
          .addColumn("createdDateTime", "integer", (col) => col.notNull())
          .addColumn("updatedDateTime", "integer", (col) => col.notNull())
          .addForeignKeyConstraint("transactions", ["transactionId"], "transactions", ["id"])
          .addForeignKeyConstraint("categories", ["categoryId"], "categories", ["id"])
          .execute(),

        db
          .insertInto("categories")
          .values([
            {
              id: crypto.randomUUID(),
              name: "",
              description: "",
              createdDateTime: Date.now(),
              updatedDateTime: Date.now(),
            },
          ])
          .execute(),
      ];
    },

    async down(db) {
      await db.deleteFrom("categories").execute();
      await db.schema.dropTable("transactions").ifExists().execute();
      await db.schema.dropTable("categories").ifExists().execute();
      await db.schema.dropTable("predictions").ifExists().execute();
    },
  },
} satisfies Migrations;
