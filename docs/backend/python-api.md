### Python FastAPI API
Base URL: `http://localhost:8000`
All endpoints except `/` and `/api/auth/login` require `Authorization: Bearer <token>`.

- GET `/` — Health/root
  - 200: `{ message: string, version: string }`

- POST `/api/auth/login`
  - Body: `{ email: string, password: string }`
  - 200: `{ access_token: string, token_type: "bearer", user: { email, name, role, plan? } }`
  - Example:
    ```bash
    curl -X POST http://localhost:8000/api/auth/login \
      -H 'Content-Type: application/json' \
      -d '{"email":"user@applyiq.com","password":"user123"}'
    ```

- GET `/api/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - 200: `{ email, name, role, plan? }`

- GET `/api/jobs`
  - Query: `limit?`, `offset?`, `company?`, `location?`
  - Returns: `JobListing[]`
  - Example:
    ```bash
    curl -H "Authorization: Bearer $TOKEN" \
      'http://localhost:8000/api/jobs?limit=5&location=Dhaka'
    ```

- GET `/api/jobs/{job_id}`
  - Returns: `JobListing`

- GET `/api/companies`
  - Query: `limit?`, `offset?`, `industry?`
  - Returns: `Company[]`

- GET `/api/companies/{company_id}`
  - Returns: `Company`

- GET `/api/applications`
  - Returns: `Application[]`

- POST `/api/applications`
  - Body: form/query `job_id: string`
  - 200: `{ message: string, application: Application }`

- GET `/api/analytics/dashboard`
  - Returns analytics for current user (admin sees admin metrics)

- GET `/api/analytics/market`
  - Returns market analytics (salary trends, industry growth, skills)

- Admin-only
  - GET `/api/admin/users` — list users
  - GET `/api/admin/analytics` — admin analytics

Types (Pydantic models): `UserLogin`, `UserResponse`, `JobListing`, `Company`, `Application`.