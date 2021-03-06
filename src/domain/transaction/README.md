# Transaction - Aggregate

---

Este agregado identifica cada lançamento do usuário, seja entrada ou saída.
O total deve ser a soma dos valores de cada item na lista de calculos da transação.
Só pode haver dois tipos de lançamento: "Entrada" ou "Saida".

```json
{
  "user-id": "uuid",
  "total-value": 100,
  "reasonId": "uuid",
  "payment-date": "2021-01-01 10:00:00",
  "transaction-type": "Entrada" | "Saida",
  "status": "Pendente" | "Concluído",
  "note": "valid_description",
  "attachment": "url",
  "transaction-calculations": [
    {
      "budgetbox-id": "uuid",
      "Value": 50
    },
    {
      "budgetbox-id": "uuid",
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
- payment-date: Value Object - Ok
