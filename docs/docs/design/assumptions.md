---
sidebar_position: 2
---

# System Assumptions

## Business & Product Assumptions

1. **MVP Scope**: The primary goal is to demonstrate core value (Ingestion -> Categorization -> Reporting) seamlessly. Advanced features like bank syncing (Plaid) are out of scope for the demo implementation and will be mocked.
2. **User Base**: The system is designed for individual retail users, not business enterprises. There is single primary user context and one active user per session. No data sharing between users or sessions.
3. **Privacy**: Data is "sensitive" but for the POC, everything stays Client-Side (Local First) or is transient in the mock backend to avoid real security/liability issues.

## Technical Assumptions

1. **Device Capability**: Users have modern browsers (Chrome/Firefox/Safari) and a reasonably capable device (laptop or high-end mobile) capable of handling ~10MB of JSON in memory.
2. **Network**: We assume variable network conditions (Requirements mention "slow networks"). The UI must function optimistically.
3. **Browser Support**: Targeting modern browsers (ES6+). No IE11 support.

## Data Assumptions

1. **Transaction Volume**: "Extreme cases" of hundreds of thousands of transactions exist, but for the _Real-Time UI_ requirement, we are strictly optimizing for **10,000 transactions** being editable/visualized without jank.
2. **CSV Format**: Users will upload standard bank CSVs (Date, Description, Amount, Currency). We assume a standardized schema for the parser or a simple mapping step.
3. **Categories**: There is a fixed set of "System Categories" (Food, Rent, Utilities) but users can create custom ones (or we stick to fixed for MVP simplicity).

## AI & Categorization Assumptions

1. **Accuracy vs Latency**:

- **Tier 1 (Local)**: Simple regex/keyword matching happens instantly (&lt;16ms). Accuracy: Low/Medium.
- **Tier 2 (Cloud AI)**: LLM-based categorization happens asynchronously. Accuracy: High. Latency: 1-2s per batch.

2. **"Real-Time" Definition**: The UI must update _optimistically_. When a user changes a category, the chart updates immediately, even if the backend is slow. Overrides feed back into training. 80–90% accuracy is acceptable initially. Categorization service may be slow or unavailable
3. **Cost**: We assume we want to minimize LLM calls. We will only send "Uncategorized" or "Low Confidence" transactions to the expensive AI model.
4. AI failures are non-fatal. System must gracefully fall back to Tier 1 (Local) categorization.

## Out of Scope

- Real bank integrations, including Plaid
- Multi-account support
- Multi-currency handling
- Tax optimization
- Fraud detection
  “

## What I would implement next

- Real bank integrations, including Plaid
- Multi-account support
- Multi-currency handling
