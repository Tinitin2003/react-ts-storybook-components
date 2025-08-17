# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https:# React Component Library

A scalable React component library built with TypeScript, TailwindCSS, and Storybook.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd react-component-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run Storybook:
   ```bash
   npm run storybook
   ```

## 📚 Documentation

Our components are fully documented in Storybook. Run `npm run storybook` and navigate to [http://localhost:6006](http://localhost:6006) to explore:

- Component APIs and props
- Interactive examples
- Accessibility guidelines
- Best practices

## 🎨 Components

### InputField
A flexible input component with validation states, multiple variants, and accessibility features.

**Features:**
- Multiple variants (filled, outlined, ghost)
- Size options (sm, md, lg)
- Validation states (invalid, loading, disabled)
- Optional clear button and password toggle
- Full accessibility support

### DataTable
A comprehensive data table with sorting, selection, and loading states.

**Features:**
- Column sorting with custom functions
- Row selection (single/multiple)
- Loading and empty states
- Custom cell rendering
- Responsive design

## 🛠️ Development

### Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.types.ts
│   │   ├── InputField.stories.tsx
│   │   ├── InputField.test.tsx
│   │   └── index.ts
│   └── DataTable/
│       ├── DataTable.tsx
│       ├── DataTable.types.ts
│       ├── DataTable.stories.tsx
│       ├── DataTable.test.tsx
│       └── index.ts
├── theme/
├── utils/
└── stories/
```

### Coding Standards

- **TypeScript**: Full type safety with strict mode
- **Accessibility**: WCAG 2.1 AA compliance
- **Testing**: Jest + React Testing Library
- **Documentation**: Comprehensive Storybook stories

### Adding New Components

1. Create component folder in `src/components/`
2. Implement component with TypeScript
3. Add comprehensive Storybook stories
4. Include accessibility features
5. Write unit tests

## 🎯 Design System

### Variants
- **filled**: Default background with border
- **outlined**: Transparent background with border
- **ghost**: Minimal styling, border on focus

### Sizes
- **sm**: Compact for dense layouts
- **md**: Standard size (default)
- **lg**: Larger for prominent placement

### States
- **default**: Normal interactive state
- **invalid**: Error state with red styling
- **disabled**: Non-interactive state
- **loading**: Processing state with spinner

## ♿ Accessibility

All components follow accessibility best practices:

- Semantic HTML structure
- ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🧪 Testing

Run tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Storybook
```bash
npm run build-storybook
```

Deploy to Chromatic:
```bash
npx chromatic --project-token=<your-token>
```

Deploy to Vercel:
```bash
vercel --prod
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📞 Support

For questions and support, please open an issue on GitHub.
//github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
