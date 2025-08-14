# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm install` - Install dependencies
- `npx expo start` - Start development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version

### Code Quality
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm test` - Run Jest tests in watch mode

### Git Hooks
- Husky is configured with lint-staged to automatically lint and format files on commit

## Project Architecture

### Technology Stack
- **Framework**: Expo SDK 53 with React Native
- **Navigation**: Expo Router with file-based routing
- **Styling**: NativeWind (Tailwind CSS for React Native) + custom color system
- **State Management**: Zustand for global state
- **API Client**: Axios with automatic token refresh and error handling
- **Forms**: React Hook Form
- **Data Fetching**: TanStack Query (React Query)
- **Storage**: Expo SecureStore for mobile, localStorage for web
- **Authentication**: JWT-based with refresh token flow

### App Structure

#### Main Features
The app has 5 main sections accessible via tab navigation:
1. **Home** (`app/index.tsx`) - Main dashboard
2. **AI** (`app/(tabs)/ai.tsx`) - AI-powered agriculture tools
3. **E-commerce** (`app/(tabs)/ecommerce.tsx`) - Agricultural marketplace
4. **Agent** (`app/agent/`) - Agricultural agent services
5. **Profile** (`app/(tabs)/profile.tsx`) - User profile and settings

#### Key Directories
- `app/` - File-based routing with Expo Router
- `components/ui/` - Reusable UI components organized by feature
- `store/` - Zustand stores for global state management
- `utils/` - Utility functions including API client, auth service, and storage
- `constants/` - App constants including color palette
- `types/` - TypeScript type definitions
- `assets/` - Images, icons, and fonts

### State Management
- **Authentication**: `store/auth/role.tsx` - Manages user role (vendor/farmer)
- **Theme**: `store/theme/mode-view.tsx` - Dark/light mode management
- **Feature Stores**: Separate stores for AI, e-commerce, social media, and location data

### API Integration
- Base API client in `utils/api/api.ts` with:
  - Automatic JWT token management
  - Token refresh on 401 errors
  - Cross-platform storage integration
  - Consistent error handling
- Authentication service in `utils/auth/AuthService.ts`
- Cross-platform storage abstraction in `utils/storage/crossPlatformStorage.ts`

### Styling System
- Uses NativeWind for Tailwind-style classes
- Custom color palette defined in `constants/Colors.ts`
- Tailwind config extends with app-specific colors (primary, secondary, etc.)
- Global styles in `global.css`

### Component Organization
Components are organized by feature area:
- `component-globals/` - Shared components (buttons, inputs, modals)
- `e-commerce/` - E-commerce specific components
- `agent/` - Agricultural agent components  
- `sosial-media/` - Social media features
- `payment/` - Payment related components
- `profile/` - User profile components

### Testing
- Jest configured with `jest-expo` preset
- Test files in `components/__tests__/`
- Snapshot testing enabled

### Environment Configuration
- Environment variables prefixed with `EXPO_PUBLIC_` for client access
- Base API URL configured via `EXPO_PUBLIC_API_URL`
- App configuration in `app.json` with plugin setup for camera, fonts, etc.

### Platform Support
- iOS, Android, and Web support
- Cross-platform storage abstraction handles SecureStore vs localStorage
- Responsive design considerations for different screen sizes