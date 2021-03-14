# User - Aggregate

```json
{
  "id": "uuid",
  "email": "example@mail.com",
  "password": "123456",
  "budgetBoxIds":["uuid", "uuid"],
  "totalBalanceAvaliable": 10.00,
  "terms": [
    {
      "ip": "120.06.09.011",
      "acceptedAt": "2021-01-01 10:00:00",
      "userAgent": {
        "name": "firefox",
        "version": "86.0.0",
        "os": "Linux",
        "type": "browser"
      }
    }
  ]
}
```

### Structure

- User: Aggregate
- id: Value Object
- email: Value Object - Ok
- password: Value Object - Ok
- ip: Value Object - Ok
- acceptedAt: Value Object - Ok
- userAgent: Object - Ok
- term: Value Object - Ok
