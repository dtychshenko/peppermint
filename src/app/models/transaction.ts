import { CategoryId } from "./category";

/** Unique identifier for a transaction */
export type TransactionId = string;

export type TransactionStatus = "reviewed" | "unreviewed";

export type TransactionSource = "csv" | "bank";

export interface Transaction {
  id: TransactionId;

  /** Date when the transaction occurred in ISO-8601 format */
  date: string;

  /** Description of the transaction */
  description: string;

  /** Positive for income, negative for expense */
  amount: number;

  /** Category assigned by the user or AI */
  category_id: CategoryId;

  /** Name of the payee, if available */
  payee: string;

  /** Source of the transaction. This can be expanded in the future to include multiple sources, ex. manual entry */
  source: TransactionSource;

  /** Whether the transaction was reviewed by the user. Transactions are unreviewed by default. When the user reviews a transaction, it becomes reviewed. */
  status: TransactionStatus;

  /** Optional user notes */
  notes?: string;

  /** Date when the transaction was created */
  created_at: Date;

  /** Date when the transaction was last updated */
  updated_at: Date;

  /** Optional original metadata, ex from Plaid */
  metadata?: Record<string, unknown>;
}
