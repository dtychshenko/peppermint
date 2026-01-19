import { env } from "cloudflare:workers";
import { type Database, createDb } from "rwsdk/db";
import { type migrations } from "./migrations";

export type AppDatabase = Database<typeof migrations>;
export type TransactionDAO = AppDatabase["transactions"];
export type CategoryDAO = AppDatabase["categories"];
export type PredictionDAO = AppDatabase["predictions"];

export const db = createDb<AppDatabase>(env.DATABASE, "peppermint-database");
