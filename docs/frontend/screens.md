### Screens and Routes

App entry: `client/App.tsx`

Routes:
- `/` → `client/pages/Index.tsx`
- `/login` → `client/pages/Login.tsx`
- `/signup` → `client/pages/Signup.tsx`
- `/onboarding` → `client/pages/Onboarding.tsx`
- `/dashboard` → `client/pages/PackageDashboard.tsx`
- `/upgrade` → `client/pages/PackageUpgrade.tsx`
- `/resume-builder` → `client/pages/ResumeBuilder.tsx`
- `/admin-dashboard` → `client/pages/AdminDashboard.tsx`
- `/demo` and `*` → `client/pages/NotFound.tsx`

Notes:
- Toast system is mounted in `App.tsx` via `<Toaster />` and `<Sonner />`.
- React Query is provided via `QueryClientProvider`.
- Use `localStorage` for demo auth flows; production should use backend APIs.