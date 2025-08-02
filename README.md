# Next.js Modern Boilerplate

A comprehensive Next.js boilerplate built with modern development tools and best practices. This project provides a solid foundation for building scalable web applications with internationalization, state management, and a complete UI component system.

## 🚀 Tech Stack

### Core Framework

- **[Next.js 15.4.5](https://nextjs.org/)** - App Router with React Server Components
- **[React 19.1.0](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://typescriptlang.org/)** - Type-safe development

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI
- **[Radix UI](https://radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching

### State Management & Data Fetching

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client

### Form Handling & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** - Type-safe internationalization

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting
- **[Commitizen](https://commitizen-tools.github.io/commitizen/)** - Conventional commits

### Additional Libraries

- **[cmdk](https://cmdk.paco.me/)** - Command palette
- **[sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[date-fns](https://date-fns.org/)** - Date utility library
- **[lodash-es](https://lodash.com/)** - Utility functions
- **[recharts](https://recharts.org/)** - Chart library

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── favicon.ico
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Layout components
│   └── data-table/       # Data table components
├── features/             # Feature-based modules
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations
├── locales/              # Translation files
│   ├── en/              # English translations
│   └── vi/              # Vietnamese translations
├── providers/            # React context providers
├── services/            # API services
│   └── apis/           # Generated API clients
├── stores/              # Zustand stores
├── styles/              # Global styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── validations/         # Zod schemas
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-boilerplate
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm check:types` - Type check with TypeScript
- `pnpm commit` - Interactive commit with Commitizen
- `pnpm gen:petstore-api` - Generate API client from Swagger

## 🌍 Internationalization

This project supports multiple languages:

- English (`en`)
- Vietnamese (`vi`)

Translation files are located in `src/locales/[locale]/` directory.

## 🎨 UI Components

The project uses Shadcn/ui components with:

- **Style**: New York
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **Icon Library**: Lucide React

## 🔧 Configuration Files

- `components.json` - Shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `next.config.ts` - Next.js configuration

## 📊 State Management

- **Global State**: Zustand stores in `src/stores/`
- **Server State**: TanStack Query for API data
- **Form State**: React Hook Form with Zod validation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push to main branch

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Development Guidelines

- Follow the coding standards defined in `.github/copilot-instructions.md`
- Use TypeScript for all files
- Prefer Server Components over Client Components
- Use the `cn()` utility for conditional Tailwind classes
- Create reusable components in appropriate directories
- Write meaningful commit messages using Commitizen

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Commit using `pnpm commit`
6. Push and create a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and modern web technologies.
