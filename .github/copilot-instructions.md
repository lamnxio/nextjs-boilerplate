# Customizing GitHub Copilot for Next.js Projects (App Router)

This file provides guidelines for GitHub Copilot to ensure consistent, clean, and efficient code generation for Next.js (App Router) applications using Shadcn UI, Tailwind CSS, Zod, React Hook Form, React Query, and Zustand.

## 1. General Principles

- **Clean Code:** Prioritize readability, maintainability, and reusability.

- **Conciseness:** Aim for concise and easy-to-understand code.

- **File & Folder Naming:** Use `param-case` (kebab-case), e.g., `user-form.tsx`, `auth-store.ts`, `product-card/`.

- **Descriptive Naming:** Use clear and descriptive names for variables, functions, components, and files (e.g., `getUserProfile`, `ProductCard`, `useAuth`).

- **DRY (Don't Repeat Yourself):** Extract reusable logic into helper functions, custom hooks, or components.

- **TypeScript:** Always use TypeScript for all code; prefer `interface` over `type` when defining props or data structures. Avoid `enum`; use objects or union types instead.

- **Components:** Keep components small and focused on a single task.
  - **Component Naming:** Use `PascalCase` for all component names (e.g., `MyButton`, `UserAvatar`).

  - **Props:**
    - Use `camelCase` for prop names.

    - Destructure props in the component's function signature.

    - Provide clear `interface` or `type` definitions for props in TypeScript.

  - **Immutability:** Never mutate props or state directly. Always create new objects or arrays for updates.

  - **Fragments:** Use `<> </>` or `React.Fragment` to avoid unnecessary DOM wrapper elements.

- **Styling:** Ensure styles are scoped to prevent global conflicts.

---

## 2. Next.js (App Router)

- **Router:** This project uses the **Next.js App Router**. Never suggest or provide code using the `pages router`.

- **Server Components (RSC):** Prefer React Server Components (RSC) whenever possible to optimize performance and reduce client-side JavaScript.
  - Limit the use of `use client` only when client-side interactivity is truly necessary (e.g., hooks, event listeners).

  - Minimize `useEffect` and `setState` in client-side components; prefer passing data down from Server Components.

- **Suspense:** Wrap client components in `Suspense` with an appropriate `fallback` to handle loading states.

- **Dynamic Loading:** Use `next/dynamic` for non-critical components to optimize bundle size.

- **Image Optimization:** Use `next/image` with WebP format, including size data and implementing lazy loading.

- **Routing:** Utilize Next.js App Router's file-system based routing.

---

## 3. Data Management

- **React Query (TanStack Query):** Use React Query for managing data fetching, caching, synchronization, and updating client-side data.
  - Use `useQuery` for GET requests.

  - Use `useMutation` for POST, PUT, DELETE operations.

  - Manage loading, error, and data states using React Query hooks.

  - Optimize queries using `staleTime`, `cacheTime`, `refetchOnWindowFocus`, etc.

- **Data Fetching in Server Components:**
  - For build-time or infrequently changing data, use `fetch` directly in Server Components with `revalidate` options (if needed).

  - For dynamic, frequently changing data, use `fetch` directly in Server Components.

  - Avoid client-side data fetching for initial page loads unless absolutely necessary (e.g., user-specific data after hydration).

  - When fetching multiple independent data sources, initiate requests in parallel.

---

## 4. UI/UX and Styling

- **Shadcn UI:** Utilize components from Shadcn UI. When creating interfaces, prioritize using or combining existing Shadcn UI components.

- **Tailwind CSS:** Use Tailwind CSS for all styling.
  - Implement responsive designs with Tailwind CSS; use a mobile-first approach.

  - Use Tailwind utility classes for styling elements.

  - When creating new components, ensure they are easily customizable with Tailwind classes.

- **`cn` helper:** Use the `cn` function (from `clsx` and `tailwind-merge`) to conditionally combine Tailwind classes and resolve conflicts.

---

## 5. Form Management and Validation

- **React Hook Form:** Use React Hook Form for managing form state, validation, and submission.
  - Use the `useForm` hook to initialize forms.

  - Use `Controller` or `useController` for custom input components (e.g., from Shadcn UI).

- **Zod:** Use Zod for schema definition and validation.
  - Create Zod schemas for form data and API data.

  - Integrate Zod with React Hook Form using `@hookform/resolvers/zod` for form validation.

---

## 6. Global State Management

- **Zustand:** Use Zustand for lightweight and flexible global state management.
  - Define Zustand stores for different parts of global state.

  - Use `create` to create a store and `useStore` to access state and actions.

  - Keep stores small and focused on a specific domain.

---

## 7. Other Principles

- **No TODOs/Placeholders:** Fully implement all requested functionality. Do not leave `TODO`s or `placeholder`s in generated code.

- **File References:** When suggesting code spanning multiple files, clearly reference file names.

- **Accuracy:** Always write accurate, up-to-date, error-free, fully functional, safe, and efficient code.

- **Readability:** Prioritize readability over performance if there is a conflict.

- **Refactoring:** Rewrite entire code only if absolutely necessary.

- **Testing:** Suggest updates or creation of relevant tests if needed.
