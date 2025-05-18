/**
 * @description This file contains the types and interfaces used in the authentication feature of the application.
 * It includes the AuthResponse interface, which represents the structure of the response
 */

export interface AuthResponse {
  kind: string;
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean;
  displayName?: string;
}
