# Peppermint

It's like your favourite Mint, but a little spicy!

## Requirements

### Introduction

You are designing a Personal Finance Dashboard that allows users to import their
transaction history, categorize expenses, and generate reports.

### Scenario

You are given this scenario by your Senior Leadership team and given full reign on what
could be built given your strengths and what you believe is best for the customer. Your
deliverable can comprise of a mix of few things :

- A coded Proof of Concept / Demo (addressing all or a subset of the features below)
- Architecture Diagrams and system design
- Technical breakdown of areas for implementation
  You will be presenting your design/plan to your dev team, as well as backend engineers that
  you will be working with, product managers and designers in order to deliver this project.
  Focus primarily on the technical aspects but consider non-technical where appropriate.

### Key Features to Design

1. Transaction Ingestion: Users upload CSVs or connect to a bank
2. Transaction Categorization: AI-based categorization of transactions that allows
   manual overrides
3. Report Generation: Analyze monthly spending by category.
4. Scalability and Security: Handles high volumes of sensitive data.
5. Graceful Degradation: Handles backend and frontend failures.

### UI Constraints and Assumptions

- Iterative: You will be delivering this system in pieces, shipping an MVP as fast as
  possible.
- Real Time Categorization: If a user modifies a category, the UI must update in real-
  time sufficiently for 10,000 transactions.
- API Design: You have a backend team working with you to implement these
  features, but you must provide a perspective on what the API will look like and what
  SLAs you’d expect.
- AI-Native : A Machine Learning team also wants your opinion on how to categorize
  transactions with AI that balances accuracy, latency, and cost. Include a few
  options to do this and design one of them in your deliverable.
- Various User Profiles: We will have extreme cases of users with hundreds of
  thousands of transactions and users with slow networks on different devices… Do
  we handle these differently?
