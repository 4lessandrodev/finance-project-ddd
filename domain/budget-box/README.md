# BudgetBox - Aggregate

```json
{
    "id":"uuid",
    "ownerId":"uuid",
    "description": "valid_description", // Value Object
    "balanceAvaliable": 1000,
    "isPercentual": true,
    "budgetPercentage": 80, // Value Object
    "transactionsIds": ["uuid", "uuid"],
    "reasons": [
        { // Entity
            "id": "uuid"
            "description": "valid_descripíont"
        }
    ],
}
```

### Structure

- BudgetBox: Aggregate
- description: Value Object - Ok
- budgetPercentage: Value Object
- reason: Entity
