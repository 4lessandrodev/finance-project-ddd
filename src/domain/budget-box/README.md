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

- BudgetBox: Aggregate - Ok
- reason-description: Value Object - Ok
- budget-description: Value Object - Ok
- budget-id: Value Object - Ok
- budget-percentage: Value Object - Ok
- reason: Entity - Ok
- reason-id: Value Object - Ok
