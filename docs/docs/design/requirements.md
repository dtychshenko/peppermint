---
sidebar_position: 1
---

# System Requirements

## Functional Requirements

### Transaction Ingestion
- Upload CSV files
- Validate and normalize input
- Idempotent ingestion (no duplicates on re-upload)

#### Designed-for (not implemented)
- Bank integrations via adapters
- Async processing for large files

#### Acceptance criteria
- 10k transactions ingested in &lt;5 seconds
- Partial failures are reported clearly

### Transaction Management
- Users must view a scrollable list of all transactions.
- Users must be able to manually edit the "Category" of any transaction.
- Changing a category must update the spending report/charts without a page reload.

### Smart Categorization (AI)
- System must attempt to categorize imported transactions automatically.
- Immediate categorization based on keywords (e.g., "Uber" -> "Transport").
- Ability to mark complex/unknown transactions for "AI Analysis" (mocked latency).

### Reporting & Analytics
- **Spending Breakdown**: Visual pie/bar chart showing total spend per category.
- Charts must reflect the current state of transactions instantly (including optimistic updates).

## Non-Functional Requirements

### Performance & Responsiveness
- **UI interaction latency**: &lt;100–200ms
- **10k Transaction Support**: The main dashboard and list must render and scroll smoothly (60fps) with 10,000 items loaded.
- **Latency**: Category updates must be reflected in the UI within 100ms (Optimistic UI).

### Usability & Experience
- Design must use modern best practices. 
- Micro-animations, dark mode and accessibility considerations.
- System must handle simulated "slow network" states without blocking the UI, displaying in-progress indicators as needed and allowing continued interaction.
- Globalization support.
- UI is responsiveness to screen size changes, but the mobile experience is best served by a dedicated native app.

### Privacy & Security
- Data is encrypyted at rest and in transit.
- No sensitive data is logged.
- Mock backend does not persist data beyond session.

### Reliability
- Use of Error Boundaries to catch React rendering errors.
- Typo-tolerance in CSV parsing (basic validation).

### Observability
- Metrics for:
    - Ingestion latency
    - Categorization accuracy
    - Override frequency
- Logs and traces across services
- Feedback loop for AI-native categorization evaluation and training

### Cost
- AI inference is selectively applied.
- Tiered service levels for heavy users

### Scalability
- Horizontal scaling of microservices
- Load balancing
- Caching of predictions
