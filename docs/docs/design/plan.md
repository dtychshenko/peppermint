---
sidebar_position: 2
---

# Implementation Plan
## Stage 1: MVP
### File Upload
Synchronous processing of user uploaded CSV file with transactions and categorization using static rules. File size is limited to cap the wait time for processing. Transactions are deduplicated based on exact combination of date, amount and description. Includes a virtualized list of transactions that loads a paginated list of up to 100 transactions to allow smooth scrolling of large number of transactions.

1. User uploads a CSV file with transactions via an upload modal. A loading spinner is shown while processing end to end.
2. Import service reads the file and stores the transactions into the database.
3. Loading modal is removed and front end displays the categorized transactions to the user.

### Categorization
A categorization micro-service is added that is invoked when the transactions are uploaded. The categorization service applies static rules and updates the transactions in the database with the category. The category is stored to the transaction record in this stage along with the categorization source. This is a one-shot inference prioritizing simplicity, speed and cost.

### Transaction Review
User reviews transactions and can manually override categories. To confirm a transaction, user clicks on a confirmation button/icon next to the transaction in the list. The user can change the category from a dropdown list. When a category is changed, the transaction is confirmed automatically. When a transaction is confirmed or category is changed, the front end sends an update request to the transaction service to update the transaction in the database. UI updates are optimistic: the UI updates immediately and rolls back if the update fails.

### Failure States
- If the file upload fails due to a network error, the request is retried up to 3 times. If it still fails, an error message is shown to the user.
- If the transaction upoad fails to read the file, an error message is logged and shown to the user.
- If some of the transactions in the file could not be parsed, those transactions are skipped and an error message is logged. The user is shown a message indicating that some transactions could not be processed.
- If the transaction review update fails, an error message is logged and the UI rolls back to the previous state.
- Latency expectations for Stage 1:
    - File upload and processing: < 30 seconds for files up to 5MB
    - Transaction review update: < 2 seconds
    - Retry attempts for failed requests: up to 3 times with exponential backoff

### Prod Launch Requirements
- [ ] Adequate unit test coverage (90%+)
- [ ] E2E tests of the happy path flow and expected failure states
- [ ] Logging, metrics and analytics for all critical paths
- [ ] Dashboard and alerts for monitoring and debugging
- [ ] Localization
- [ ] Major features are behind feature flags
- [ ] App and server configurations are validated in a staging environment
- [ ] QA / PM signoff

## Stage 2: Async Processing
- Transactions are now processed asynchronously. File size limit is increased. 
- Deduplication of transactions is added.
- Lays groundwork for async AI-native categorization.

### Process
1. User uploads a CSV file with transactions via an upload modal. A loading spinner is shown while the file is being uploaded.
2. When upload is complete, the spinner is removed and a message is shown that processing is underway.
3. **Orchestration service** is added that coordinates async workflows between transaction uploads, categorization and front-end messaging. The service is stateless and doesn't preserve any data.
3. Orchestration service sends the file to the transaction service that reads the file, identifies duplicates, and stores new transactions into the database.
4. Categorization service is invoked asynchronously via a queue to categorize the transactions using static rules.
5. Once processing is complete, the orchestration service sends the transactions list to the front end.
6. Front end displays a toast notification that processing is complete and the categorized transactions are available to view.
7. User clicks on the notification to view the categorized transactions. If the user misses the notification, the transactions will be downloaded on the transactions page reload.

## Stage 3: AI-Native Categorization
A feature flag is added to enable AI-native categorization. When enabled, the categorization service is enhanced to use a pre-trained ML model to categorize transactions. The model is invoked asynchronously via a queue after the static rules categorization is complete. The model returns the category along with a confidence score. If the confidence score is above a threshold, the transaction is marked reviewed automatically.

If categorization via ML model fails, the transaction is categorized using static rules.
If the static rules have no match, the transaction is marked as "Uncategorized" and requires manual review by the user.

## Stage 4: Reporting
A widget is added that shows monthly spending by category. Users can select a month and view a breakdown of spending by category.

1. A dropdown is added that allows users to select a month/year.
2. When a month is selected, the front end queries the transaction service for transactions in that month.
3. The transaction service returns the data to the front end.
4. The front end aggregates the data and displays a pie chart showing the breakdown of spending by category.

## Prioritized Future Work
1. Users can connect their bank accounts to automatically import transactions. Plaid integration is used for this feature. Processing is done asynchronously and follows the same path as Stage 2. Peppermint does not store user credentials, only the access tokens provided by Plaid.
2. Developer API for accessing transaction data and third party app integrations.
3. Categorization is improved using a pre-trained ML model. When user reviews the transactions, the category and the transaction data is sent back to the model for fine-tuning.
4. Add a reporting service that can generate data reports on the server side instead of aggregating on the front end. Reports can be scheduled and emailed to users periodically.
5. Support for multiple accounts per user.
6. Support for multi-currency transactions.

# Design Choices
1. Use Redwood SDK with Cloudflare Workers as the development platform for the POC
    - Pros: Scalability, performance, global distribution, cost-effectiveness, ready to use features that will be useful for this app:
        - Durable Objects for structured data storage
        - Object storage for file uploads
        - Realtime updates for transaction processing feedback loop
        - Queues for background processing of large number of transactions and categorization
        - Cron triggers for periodic download of transactions from banks
        - Workers AI for ML model inference
    - Cons: Vendor lock-in
2. Use Mantine UI for quick prototyping of the front end

# Intuit-specific Choices
- Estimate traffic based on public Mint data
- Create a new app, app plugin and plugin in Appfabric
    - Use Dynex stack and the Player for front end
    - Use CGDS for Player plugins
- Data import using Data-X
- Security using Identity Platform / IUS
- Experimentation using IXP
- Observability with Splunk logs, dashboards and alerts
- Data storage, IDPS for encryption
