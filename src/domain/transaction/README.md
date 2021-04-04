# Transaction - Aggregate

```json
{
  "userId": "uuid",
  "totalValue": 100,
  "reasonId": "uuid",
  "paymentDate": "2021-01-01 10:00:00",
  "transaction-type": "Entrada" | "Saida",
  "status": "Pendente" | "Concluído",
  "note": "valid_description",
  "attachment": "url",
  "transaction-calculations": [
    {
      "budgetBoxId": "uuid",
      "Value": 50
    },
    {
      "budgetBoxId": "uuid",
      "Value": 50
    }
  ]
}
```

- transaction-type: Value Object (enum) - Ok
- status: Value Object (enum) - Ok
- note: Value Object - Ok
- attachment-path: Value Object - Ok
- transaction-calculations: Value Object - Ok
- paymentDate: Value Object - Ok
