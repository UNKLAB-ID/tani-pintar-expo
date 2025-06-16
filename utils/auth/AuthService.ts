import api from '@/utils/api/api';
import { crossPlatformStorage } from '@/utils/storage/crossPlatformStorage';

/**
 * Authentication utility with cross-platform token management
 */
export class AuthService {
  /**
   * Check if user is authenticated (has valid access token)
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await api.auth.getAccessToken();
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Login with phone and OTP
   */
  static async login(phone: string, code: string) {
    try {
      const response = await api.post('/accounts/login/confirm', {
        phone_number: phone,
        code: code,
      });

      if (response.success && response.data) {
        await api.auth.setTokens(response.data.access, response.data.refresh);
        return { success: true, data: response.data };
      }

      return { success: false, message: response.message, error: response.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed', error };
    }
  }

  /**
   * Register with phone and OTP
   */
  static async register(phone: string, code: string) {
    try {
      const response = await api.post('/accounts/register/confirm', {
        phone_number: phone,
        code: code,
      });

      if (response.success && response.data) {
        await api.auth.setTokens(response.data.access, response.data.refresh);
        return { success: true, data: response.data };
      }

      return { success: false, message: response.message, error: response.error };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Registration failed', error };
    }
  }

  /**
   * Logout user and clear tokens
   */
  static async logout(): Promise<void> {
    try {
      // Optionally call logout endpoint if your API has one
      // await api.post('/accounts/logout/');
      
      await api.auth.clearTokens();
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if API call fails
      await api.auth.clearTokens();
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser() {
    try {
      const response = await api.get('/accounts/profile/');
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      return { success: false, message: 'Failed to get user profile', error };
    }
  }

  /**
   * Check if storage is working properly
   */
  static async checkStorageHealth(): Promise<boolean> {
    try {
      return await crossPlatformStorage.isAvailable();
    } catch (error) {
      console.error('Storage health check failed:', error);
      return false;
    }
  }
}

export default AuthService;
