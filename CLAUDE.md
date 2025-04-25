# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Description:  This is an Electron app.

## Build Commands
- `yarn dev`: Run development server with live Tailwind CSS rebuilding
- `yarn build`: Build for production with TypeScript checking

## Code Style Guidelines
- **TypeScript**: Strict mode enabled, avoid unused variables/parameters
- **React**: Use functional components with React hooks
- **Styling**: Use Tailwind CSS utilities, defined in tailwindcss.config.json
- **Imports**: Group imports by external packages first, then internal modules
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Error Handling**: Use try/catch blocks and provide meaningful error messages
- **Formatting**: Follow ESLint recommended rules for TypeScript and React
- **Types**: Prefer explicit type annotations over inferred types for function parameters
- **Components**: Each component in its own file, export as default, use .tsx extension
