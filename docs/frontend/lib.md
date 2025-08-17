### Libraries and Utilities

- cn (`@/lib/utils`)
  - Type-safe class name merge utility (`clsx` + `tailwind-merge`)
  - Example:
    ```ts
    import { cn } from "@/lib/utils";
    const className = cn("p-2", isActive && "bg-blue-500");
    ```

- apiClient (`@/lib/api`)
  - A minimal client for the FastAPI backend with built-in demo fallbacks.
  - Methods:
    - `login(credentials: { email: string; password: string })`
    - `getCurrentUser()`
    - `logout()`
    - `getJobs(params?)`, `getJob(jobId)`
    - `getCompanies(params?)`, `getCompany(companyId)`
    - `getApplications()`, `createApplication(jobId)`
    - `getDashboardAnalytics()`, `getMarketAnalytics()`
    - `getAllUsers()` (admin), `getAdminAnalytics()` (admin)
  - Setup and use:
    ```ts
    import { apiClient } from "@/lib/api";

    // Login
    const { access_token, user } = await apiClient.login({
      email: "user@applyiq.com",
      password: "user123",
    });

    // Authenticated request (token auto-included)
    const jobs = await apiClient.getJobs({ limit: 5, location: "Dhaka" });
    ```

  - Environment: set `VITE_API_URL` to point to FastAPI (default `http://localhost:8000`).