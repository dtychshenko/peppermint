import { CategoryId } from "./category";
import { TransactionId } from "./transaction";

/**
 * Prediction of a transaction category
 */
export interface Prediction {
  transactionId: TransactionId;
  categoryId: CategoryId;
  confidence: number; // 0–1
  model: string;
  inferenceLatencyMs: number;
  predictedDateTime: string;
}
