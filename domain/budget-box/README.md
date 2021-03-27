# BudgetBox - Aggregate

```json
{
  "id": "uuid",
  "ownerId": "uuid",
  "description": "valid_description",
  "balanceAvaliable": 1000,
  "isPercentual": true,
  "budgetPercentage": 80,
  "reasons": [
    {
      "id": "uuid",
      "description": "valid_descripíont"
    }
  ]
}
```

### Structure

- BudgetBox: Aggregate
- description: Value Object - Ok
- budget-id: Value Object - Ok
- budgetPercentage: Value Object - Ok
- reason: Entity
