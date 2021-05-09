# User - Aggregate

---

Este é o agregado usuário que por sua vez identificará a quem pertence os caixas e as transações.
Para atender a nova lei do LGPD o usuário deve aceitar os termos ao se cadastrar na plataforma e/ou
sempre quando houver uma alguma alteração no mesmo.

```json
{
  "id": "uuid",
  "email": "example@mail.com",
  "password": "123456",
  "terms": [
    {
      "ip": "120.06.09.011",
      "accepted-at": "2021-01-01 10:00:00",
      "user-agent": {
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

- User: Aggregate - Ok
- id: Value Object - Ok
- email: Value Object - Ok
- password: Value Object - Ok
- ip: Value Object - Ok
- accepted-at: Value Object - Ok
- user-agent: Object - Ok
- term: Value Object - Ok
