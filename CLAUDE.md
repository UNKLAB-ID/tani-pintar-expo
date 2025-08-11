# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm install` - Install dependencies
- `npx expo start` - Start development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run web version

### Code Quality
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run Jest tests with watch mode

### Git Hooks
The project uses Husky and lint-staged to automatically lint and format code on commit.

## Architecture Overview

### Project Structure
This is a React Native Expo app using:
- **Expo Router** for file-based routing with typed routes
- **NativeWind** (Tailwind CSS) for styling
- **Zustand** for state management
- **React Query** for data fetching
- **Axios** with automatic token refresh for API calls

### Key Directories
- `app/` - File-based routing structure with Expo Router
  - `(tabs)/` - Tab navigation layout
  - `e-commerce/` - E-commerce related screens
  - `sosial-media/` - Social media features
  - `profile/` - User profile management
- `components/ui/` - Reusable UI components organized by feature
- `store/` - Zustand stores for state management
- `utils/` - Utility functions including API and auth services
- `assets/` - Static assets (images, icons, fonts)

### Authentication System
- JWT-based authentication with automatic token refresh
- Cross-platform storage using `crossPlatformStorage` utility
- Phone number + OTP authentication flow
- `AuthService` class provides authentication methods
- API interceptors handle token management automatically

### State Management
- **Zustand** stores in `/store` directory
- Feature-based store organization (ai-store, e-commerce, sosial-media)
- Stores use TypeScript interfaces for type safety

### API Integration
- Centralized API client in `utils/api/api.ts`
- Automatic token refresh on 401 responses
- Consistent error handling and response formatting
- Base URL configured via `EXPO_PUBLIC_API_URL` environment variable

### Styling System
- **NativeWind** (Tailwind CSS for React Native)
- Custom color palette defined in `constants/Colors.ts`
- Extended Tailwind config with project-specific colors
- Responsive design patterns

### Navigation
- **Expo Router** with file-based routing
- Tab navigation for main sections (AI, E-commerce, Social Media, Profile)
- Typed routes enabled for better development experience
- Deep linking support configured

## Environment Configuration
- Create `.env.local` file with `EXPO_PUBLIC_API_URL=your_api_url`
- Expo configuration in `app.json` includes camera permissions and splash screen
- TypeScript configuration with path aliases (`@/*` maps to root)

## Testing
- Jest configured with `jest-expo` preset
- Component tests in `components/__tests__/`
- Run tests with `npm test` for watch mode

## Key Features
This is TaniVerse - a digital agriculture platform with:
- AI-powered agriculture tools
- E-commerce marketplace for farmers
- Social media for agricultural community
- Real-time market insights
- Digital distribution network