# API Endpoints

## GET `/api/cron`

Executes internships scraping process and notifies the suscripted users whose alerts matches the new internships loaded.

This endpoint is designed to be user for externals schedulers and NOT for users or clients.

---

### Authentication and Authorization

Requires a Bearer token in the Header `Authorization`.

| Header          | Valor                  |
| --------------- | ---------------------- |
| `Authorization` | `Bearer <CRON_SECRET>` |

The value of `CRON_SECRET` should be defined in the server enviroment variables

---

### Request

```
GET /api/cron
Authorization: Bearer <CRON_SECRET>
```

## Does not recibe body or query params

### Responses

#### `200 OK` — Successful execution

```json
{
  "message": "Internships obtained successfuly",
  "success": true
}
```

#### `401 Unauthorized` — Lack of token or not valid

```
HTTP/1.1 401 Unauthorized
```

Without body.

#### `500 Internal Server Error` — Error during execution

```
HTTP/1.1 500 Internal Server Error
```

Without boyd. The error logs in the server (`console.log`).

---

### Flow

1. Validares header `Authorization` against `CRON_SECRET`.
2. Creates `CronController` and calls `.cron()`.
3. If successful response with `200` status and confirmation message.
4. If not, returns `500` status and logs the error.

---

### Required enviromenet variables for this endpoint

| Var           | Desc                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| `CRON_SECRET` | Cron job API key for scraping internships and notifying suscripted users |

---

### Configuration

This endpoint has been design to be executed with Vercel Cron.
This endpoint is defined to be executed according to `vercer.json` file

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 10 * * *"
    }
  ]
}
```

> Revisá tu `vercel.json` para confirmar el schedule configurado en tu proyecto.
