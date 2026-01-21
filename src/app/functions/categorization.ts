import { db, PredictionDAO, TransactionDAO } from "../db";
import { seeds } from "../db/seeds";

type CategoryName = ReturnType<typeof seeds>["categories"][number]["name"];

interface CategorizationRule {
  category: CategoryName;
  keywords: Array<string>;
}

/**
 * Static categorization rules.
 * In future versions, these rules can be moved to the database to allow users to define their own.
 * Rules are evaluated in order - first match wins. In the future, we can use a more complex matching algorithm.
 */
const CATEGORIZATION_RULES: Array<CategorizationRule> = [
  {
    category: "Shopping",
    keywords: ["amazon", "amzn", "paypal"],
  },
  {
    category: "Clothing",
    keywords: ["gap", "jacadi", "zara"],
  },
  {
    category: "Utilities",
    keywords: ["rogers", "public mobile", "ooma", "oxio"],
  },
  {
    category: "Food",
    keywords: ["burger", "tim hortons", "wat ah jerk", "coffee"],
  },
  {
    category: "Groceries",
    keywords: ["metro", "t&t", "fortinos", "starsky"],
  },
];

/**
 * Applies static categorization rules based on transaction description.
 *
 * @param description Transaction description
 * @returns Category name or null if no match found
 */
function getStaticCategory(description: string): CategoryName | null {
  const desc = description.toLowerCase();

  // Find first rule where any keyword matches
  for (const rule of CATEGORIZATION_RULES) {
    if (rule.keywords.some((keyword) => desc.includes(keyword))) {
      return rule.category;
    }
  }

  return null;
}

export async function categorize(transaction: TransactionDAO): Promise<void> {
  const categories = await db.selectFrom("categories").selectAll().execute();
  const categoryMap = new Map(categories.map((category) => [category.name, category]));
  const categoryName = getStaticCategory(transaction.payee);
  const category = categoryMap.get(categoryName ?? "");

  if (!category) {
    // Skipping if no matching category found
    console.log("No category found for transaction", transaction);
    return;
  }

  // TODO: Trigger the async AI categorization function...

  const prediction: PredictionDAO = {
    id: crypto.randomUUID(),
    transactionId: transaction.id,
    categoryId: category.id,
    model: "static",
    createdDateTime: Date.now(),
    updatedDateTime: Date.now(),
    predictedDateTime: Date.now(),
    inferenceLatencyMs: null,
    confidence: null,
  };

  const { id } = await db
    .insertInto("predictions")
    .values(prediction)
    .returning("id")
    .executeTakeFirstOrThrow();

  console.log("Prediction created", id);
}
