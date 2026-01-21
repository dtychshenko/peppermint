import { TransactionDAO } from "../db";

export interface CategorizedTransaction extends TransactionDAO {
  categoryId?: string | null;
}
