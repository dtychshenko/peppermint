"use server";

import { env } from "cloudflare:workers";
import { CategoryDAO, db, PredictionDAO, TransactionDAO } from "../db";

const MODEL = "@cf/meta/llama-3.1-8b-instruct-awq";
const BATCH = 5;

const system_prompt = `
You are a financial transaction categorization engine.

Your task:
- Given a list of categories and a list of transactions, assign exactly one category to each transaction
- Use only the provided category list
- Be conservative with confidence

Rules:
- Do NOT invent categories
- Do NOT change transaction IDs or category IDs
- If confidence is below 0.5, skip the transaction and do not provide it in the output
- Output valid JSON only without any additional text, markdown formatting, or comments.
- Do NOT use markdown code blocks or any other code block markers. Return strictly valid parsable JSON.

Return a JSON array where each item includes:
- transactionId
- categoryId
- confidence (0.0 to 1.0)
`;

interface CategorizationResult {
  transactionId: string;
  categoryId: string;
  confidence: number;
}

export async function categorizeWithAI(transactions: Array<TransactionDAO>): Promise<void> {
  assertWorkerRuntime();

  console.log("Categorizing transactions with AI");
  const categories = await db.selectFrom("categories").selectAll().execute();

  // Split transactions into batches
  const batches = [];
  for (let i = 0; i < transactions.length; i += BATCH) {
    batches.push(transactions.slice(i, i + BATCH));
  }

  console.log(`Processing ${batches.length} batches in parallel`);

  // Process batches concurrently
  const results = await Promise.allSettled(batches.map((batch) => processBatch(categories, batch)));

  // Log results
  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;
  console.log(`Categorization complete. Succeeded: ${succeeded}, Failed: ${failed}`);
}

async function processBatch(categories: Array<CategoryDAO>, batch: Array<TransactionDAO>) {
  performance.mark("start");

  const messages = [
    { role: "system", content: system_prompt },
    { role: "user", content: buildUserPrompt(categories, batch) },
  ];

  console.log("Sending AI Prompt");
  const { response } = await env.AI.run(MODEL, { max_tokens: 1024, messages });
  console.log("AI Response", response);

  performance.mark("end");
  performance.measure("AI", "start", "end");
  console.log("AI", performance.getEntriesByName("AI")[0].duration);

  if (!response) {
    console.warn("Failed to get response from AI");
    return;
  }

  const categorizationResults = parseCategorizationResult(response);
  if (!categorizationResults.length) {
    return;
  }

  const predictions: Array<PredictionDAO> = categorizationResults.map((result) => ({
    id: crypto.randomUUID(),
    transactionId: result.transactionId,
    categoryId: result.categoryId,
    model: MODEL,
    createdDateTime: Date.now(),
    updatedDateTime: Date.now(),
    predictedDateTime: Date.now(),
    inferenceLatencyMs: performance.getEntriesByName("AI")?.[0]?.duration ?? null,
    confidence: result.confidence,
  }));

  console.log("processBatch results", predictions);

  const { id } = await db
    .insertInto("predictions")
    .values(predictions)
    .returning("id")
    .executeTakeFirstOrThrow();

  console.log(`Categorized ${predictions.length} transactions`);
  console.log(`Created predictions ${id}`);
}

function parseCategorizationResult(response: string): Array<CategorizationResult> {
  try {
    // Sanitize response: remove markdown code blocks and whitespace
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Basic validation
    if (!Array.isArray(parsed)) {
      console.warn("AI response is not an array");
      return [];
    }

    return parsed as Array<CategorizationResult>;
  } catch (e) {
    console.warn("Failed to parse response from AI", e);
    console.warn("Raw response:", response);
    return [];
  }
}

function buildUserPrompt(categories: Array<CategoryDAO>, transactions: Array<TransactionDAO>) {
  return `
CATEGORIES:
${JSON.stringify(
  categories.map((c) => ({
    categoryId: c.id,
    name: c.name,
  })),
)}

TRANSACTIONS:
${JSON.stringify(
  transactions.map((t) => ({
    transactionId: t.id,
    merchant: t.payee,
    amount: t.amount,
  })),
)}

Categorize every transaction
`;
}

function assertWorkerRuntime() {
  if (typeof WebSocketPair === "undefined") {
    throw new Error("Workers AI can only be used in a Worker runtime");
  }
}
