### Node/Express API
Base URL: `http://localhost:5000`
Common requirements: JSON body, `Authorization: Bearer <token>` on protected endpoints.

Health
- GET `/api/health` — returns status and DB connectivity

Auth (`/api/auth`)
- POST `/register` — register new user
  - Body: `{ firstName, lastName, email, password, plan? }`
  - 201: `{ message, token, user }`
- POST `/login` — authenticate
  - Body: `{ email, password }`
  - 200: `{ message, token, user: { ...profile, package } }`
- GET `/profile` — current user profile
  - Headers: `Authorization: Bearer <token>`

Users (`/api/users`)
- POST `/onboarding` — complete onboarding
  - Body: `{ career_goal, experience_level, industry, location }`
- GET `/dashboard` — consolidated dashboard data
- PUT `/profile` — update profile
- GET `/usage` — usage stats for current month

Packages (`/api/packages`)
- GET `/` — list available packages
- GET `/current` — current subscription
- POST `/upgrade` — change package
  - Body: `{ package_id, payment_method, transaction_id?, amount_bdt? }`
- GET `/history` — subscription history
- GET `/payments` — payment history
- POST `/cancel` — cancel subscription (downgrade to free)

Resumes (`/api/resumes`)
- GET `/` — list user resumes
- GET `/:id` — get a resume with revisions
- POST `/` — create resume
  - Body: `{ title, content, template_id, ats_score }`
- PUT `/:id` — update resume
- POST `/:id/revisions` — create revision
  - Body: `{ changes: any }`
- DELETE `/:id` — delete resume

Jobs (`/api/jobs`)
- GET `/matches` — paginated job matches
  - Query: `page?`, `limit?`, `company?`, `location?`, `min_score?`
- POST `/matches` — create/save matches (admin/external)
  - Body: `{ jobs: Array<{ job_title, company, location?, salary?, match_score, job_data?, source? }> }`
- POST `/:id/apply` — mark job as applied
- POST `/:id/save` — save job
- GET `/saved` — saved jobs
- GET `/applied` — applied jobs
- POST `/generate-sample` — create sample jobs for user

Example login + authorized request
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"me@example.com","password":"secret"}' | jq -r .token)

curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/users/dashboard
```