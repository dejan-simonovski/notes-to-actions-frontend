---

name: gemini-frontend
description: >
Standards and conventions for building frontend applications with Antigravity and Gemini.
Use this skill whenever writing, reviewing, or scaffolding frontend code in this project —
including creating components, hooks, services, pages, API calls, or any shared utilities.
Triggers on any frontend task: new features, refactors, code reviews, or architecture questions.
------------------------------------------------------------------------------------------------

# Gemini Frontend Skill

This skill defines the code standards, folder structure, and architectural conventions for the Gemini + Antigravity frontend. Always follow these rules when generating or modifying any frontend code.

---

## 1. Code Quality

### Formatting & Indentation

* Use **2-space indentation** consistently across all files.
* One statement per line.
* Avoid nested ternaries.
* Avoid inline ternaries that exceed ~80 characters.
* Trailing commas in multi-line objects, arrays, and function parameters.
* Single quotes for strings unless the string contains a single quote.
* Always use TypeScript.
* Explicitly type all public APIs, component props, hook returns, and service responses.
* Never use `any`. Use proper types, interfaces, or generics.

### DRY Principle (Do Not Repeat Yourself)

* Extract any logic used more than once into a shared utility, hook, or service.
* Never copy-paste blocks of JSX.
* Extract repeated UI into reusable components.
* Constants (strings, numbers, URLs, routes, keys) belong in a dedicated `constants/` file.
* Never hardcode reusable values inline.
* Shared types/interfaces live in `types/` and are imported where needed.

### Naming Conventions

* Components: `PascalCase`
* Hooks: `useCamelCase`
* Services: `camelCaseService`
* Constants: `UPPER_SNAKE_CASE`
* Utility functions: `camelCase`
* Types and interfaces: `PascalCase`
* Files should match the primary export name.

Example:

```ts
UserCard.tsx
useUserProfile.ts
userService.ts
APP_ROUTES.ts
```

---

## 2. Component Architecture

### Modular, Decomposed Components

* Each component must have a single responsibility.
* If a component renders more than ~100 lines of JSX, split it into subcomponents.
* Prefer composition over large monolithic components.
* Business logic should not live inside UI components.

Example:

```text
components/
└── UserCard/
    ├── index.tsx
    ├── UserCard.Avatar.tsx
    ├── UserCard.Info.tsx
    └── UserCard.Actions.tsx
```

### Component Responsibilities

#### index.tsx

* Composes subcomponents.
* Receives data from hooks/pages.
* Contains minimal logic.

#### Subcomponents

* Render UI only.
* No API calls.
* No side effects.

### Props

* Always define a `Props` type at the top of the file.
* Never use implicit prop typing.
* Avoid prop drilling deeper than 2 levels.
* Use context or hooks when data is shared deeply.

Example:

```ts
type Props = {
  profile: UserProfile;
};
```

---

## 3. Folder Structure

```text
src/
├── components/
├── hooks/
├── pages/
├── services/
├── constants/
├── types/
├── utils/
└── interceptors/
```

### Folder Rules

| Folder       | Allowed                                     | Not Allowed               |
| ------------ | ------------------------------------------- | ------------------------- |
| components   | UI rendering and composition                | API calls, business logic |
| hooks        | useState, useEffect, handlers, side effects | JSX                       |
| pages        | Route assembly                              | Reusable UI               |
| services     | API calls and external integrations         | UI logic                  |
| constants    | Shared constants                            | Logic                     |
| types        | Shared interfaces/types                     | Business logic            |
| utils        | Pure helper functions                       | React hooks               |
| interceptors | HTTP middleware                             | Business logic            |

---

## 4. Hooks

### All Stateful Logic Lives in Hooks

Any logic involving:

* useState
* useEffect
* useMemo
* useCallback
* useRef
* Event handlers
* Side effects
* Data fetching

must live in `hooks/`.

### Hook Naming

```ts
useUserProfile.ts
useSubmitOrder.ts
useModal.ts
```

### Hook Guidelines

* Return only what consumers need.
* Keep APIs minimal.
* Encapsulate side effects.
* Keep components focused on rendering.

Example:

```ts
export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    userService
      .getProfile(userId)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [userId]);

  return {
    profile,
    loading,
  };
}
```

---

## 5. Services

### Service Responsibilities

* API communication.
* Data fetching.
* External integrations.
* Response mapping.

### Service Rules

* One service per domain.
* No React imports.
* No component state.
* No UI concerns.
* Always return typed responses.
* Always use the shared HTTP client.

Example:

```ts
import { httpClient } from '../interceptors/httpClient';
import { UserProfile } from '../types/user';

export async function getProfile(
  userId: string,
): Promise<UserProfile> {
  const { data } = await httpClient.get(`/users/${userId}`);

  return data;
}
```

---

## 6. Pages

### Page Responsibilities

Pages should:

* Assemble layout.
* Connect hooks to components.
* Handle route parameters.

Pages should NOT:

* Perform raw API calls.
* Contain large business logic.
* Manage complex side effects.

Example:

```ts
import { UserCard } from '../components/UserCard';
import { useUserProfile } from '../hooks/useUserProfile';

type Props = {
  userId: string;
};

export default function UserProfilePage({
  userId,
}: Props) {
  const { profile, loading } =
    useUserProfile(userId);

  if (loading) {
    return <Spinner />;
  }

  return <UserCard profile={profile} />;
}
```

---

## 7. Global HTTP Interceptor

### Single Source of HTTP Configuration

All HTTP traffic must go through:

```text
interceptors/httpClient.ts
```

### Responsibilities

* Attach auth tokens.
* Global error handling.
* Request logging.
* Response logging.
* Retry strategies.
* Common headers.

Example:

```ts
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('auth_token');

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
```

### Rules

* Never use fetch directly.
* Never create additional HTTP clients.
* Never duplicate auth logic.

---

## 8. State Management

### Local State

Use component state only for:

* UI toggles.
* Form values.
* Temporary display state.

### Shared State

Use:

* Context
* Dedicated state management solution

when state is consumed by multiple features.

### Rules

* Avoid unnecessary global state.
* Keep state as close as possible to its consumers.
* Derived state should be computed, not stored.

---

## 9. Constants

### Rules

* No hardcoded routes.
* No hardcoded API paths.
* No hardcoded labels used multiple times.
* No magic numbers.

Example:

```ts
export const APP_ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
};
```

---

## 10. Types

### Rules

* Shared types belong in `types/`.
* Avoid duplicate interfaces.
* Reuse existing types before creating new ones.
* Prefer explicit domain models.

Example:

```ts
export type UserProfile = {
  id: string;
  name: string;
  email: string;
};
```

---

## 11. Utilities

### Rules

Utilities must be:

* Pure functions.
* Stateless.
* Reusable.

Example:

```ts
export function formatCurrency(
  amount: number,
): string {
  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    },
  ).format(amount);
}
```

---

## 12. Comments & Documentation

### Avoid Inline Comments

Do not add comments that explain obvious code behavior.

Bad:

```ts
// Set loading to true
setLoading(true);
```

Good:

```ts
setLoading(true);
```

### Allowed Comments

Comments are allowed only when:

* Explaining a non-obvious business rule.
* Documenting a third-party workaround.
* Explaining a complex algorithm.
* Adding TODOs with ticket references.

Example:

```ts
// Required because Stripe sends incomplete metadata during webhook retries.
// Ref: GEM-1234
```

### Generated Code Rules

* Do not generate unnecessary comments.
* Do not add file header comments.
* Do not add section separator comments.
* Do not add JSX comments.
* Prefer clear naming over comments.

---

## 13. Performance

### Rules

* Memoize expensive computations.
* Avoid unnecessary re-renders.
* Lazy-load large features.
* Use code splitting where appropriate.
* Avoid inline object creation inside JSX when reusable.
* Avoid inline functions when passed repeatedly to deeply nested children.

---

## 14. Testing Mindset

### Rules

Code should be structured to be testable:

* Business logic in hooks/services/utils.
* Components focused on rendering.
* Avoid tightly coupling API logic to UI.
* Prefer dependency boundaries that are easy to mock.

---

## 15. Review Checklist

Before finalizing any code, verify:

* [ ] Uses 2-space indentation
* [ ] No duplicated logic
* [ ] Logic extracted into hooks/services/utils where appropriate
* [ ] Component responsibility is clear
* [ ] JSX split into subcomponents when large
* [ ] All stateful logic lives in hooks
* [ ] No raw API calls in pages/components
* [ ] All API calls use interceptors/httpClient
* [ ] Props explicitly typed
* [ ] No any types
* [ ] Shared types live in types/
* [ ] Constants extracted
* [ ] No hardcoded reusable values
* [ ] No unnecessary comments
* [ ] Clear naming instead of explanatory comments
* [ ] Services return typed responses
* [ ] Folder structure respected
* [ ] Code follows DRY principles
* [ ] Business logic separated from UI
* [ ] Performance considerations applied where needed