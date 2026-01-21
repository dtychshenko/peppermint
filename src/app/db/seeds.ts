import crypto from "node:crypto";

export const seeds = () =>
  ({
    categories: [
      {
        id: crypto.randomUUID(),
        name: "Food",
        description: "Transactions related to food purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Shopping",
        description: "Transactions related to shopping purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Transportation",
        description: "Transactions related to transportation purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Clothing",
        description: "Transactions related to clothing purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Entertainment",
        description: "Transactions related to entertainment purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Groceries",
        description: "Transactions related to groceries purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Education",
        description: "Transactions related to education purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        name: "Utilities",
        description: "Transactions related to utilities purchases",
        createdDateTime: Date.now(),
        updatedDateTime: Date.now(),
      },
    ],
  }) as const;
