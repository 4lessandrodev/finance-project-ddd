# User - Aggregate

```json
{
  "id": "uuid",
  "email": "example@mail.com",
  "password": "123456",
  "terms": [
    {
      "ip": "120.06.09.011",
      "acceptedAt": "2021-01-01 10:00:00"
    },
    {
      "ip": "120.06.09.011",
      "acceptedAt": "2021-08-01 20:00:00"
    }
  ]
}
```

### Structure

- User: Aggregate
- id: Value Object
- email: Value Object - Ok
- password: Value Object - Ok
- ip: Value Object
- acceptedAt: Value Object
