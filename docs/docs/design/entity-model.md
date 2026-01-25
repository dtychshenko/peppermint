---
sidebar_position: 3
---

# Entity Model

## Transactions
```typescript
/** Unique identifier for a transaction */
type TransactionId = string;

type TransactionStatus = "reviewed" | "unreviewed";

type TransactionSource = "csv" | "bank";

interface Transaction {
  id: TransactionId;

  /** Date when the transaction occurred in ISO-8601 format in UTC */
  date: Date;

  /** Positive for income, negative for expense */
  amount: number;

  /** Category assigned by the user or AI. Stored separately from transactions */
  category?: Category;

  /** Name of the payee, if available */
  payee: string;

  /** Source of the transaction. This can be expanded in the future to include multiple sources, ex. manual entry */
  source: TransactionSource;

  /** Whether the transaction was reviewed by the user. Transactions are unreviewed by default. When the user reviews a transaction, it becomes reviewed. */
  status: TransactionStatus;

  /** Optional user notes */
  notes?: string;

  /** Date when the transaction was created in ISO-8601 extended format in UTC */
  createdDateTime: Date;

  /** Date when the transaction was last updated in ISO-8601 extended format in UTC */
  updatedDateTime: Date;

  /** Optional original metadata, ex from Plaid */
  metadata?: Record<string, unknown>;
}
```

## Categories
```typescript
/** Unique identifier for a category */
type CategoryId = string;

interface Category {
  id: CategoryId;

  /** Name of the category */
  name: string;

  /** Optional description of the category */
  description?: string;

  /** Date when the category was created in ISO-8601 extended format in UTC */
  createdDateTime: Date;

  /** Date when the category was last updated in ISO-8601 extended format in UTC */
  updatedDateTime: Date;

  /** Omitting for initial release to keep the category structure flat */
  // subcategories: Array<Category>;
}
```

## Predictions
```typescript
/** Category predictions are stored separately in an event-based model to avoid mutations and overrides */
interface Prediction {
    /** ID of the transaction */
  transactionId: TransactionId;

  /** ID of the category */
  categoryId: CategoryId;

  /** Confidence score of the prediction */
  confidence?: number; // 0–1

  /** Model that made the prediction. If the user overrides a prediction, the model will be set to "user" */
  model: "user" | "rules" | "ai" | string;

  /** Inference latency in milliseconds */
  inferenceLatencyMs?: number;

  /** Date when the prediction was made in ISO-8601 extended format in UTC */
  predictedDateTime?: Date;

  /** Date when the prediction was created in ISO-8601 extended format in UTC */
  createdDateTime: Date;
}
```

