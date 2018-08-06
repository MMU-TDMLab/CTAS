/**
 * Authenticated data known as the AuthData, will check these values in order to authenticated the
 * user. This interface is in place to help facilitate that, requiring the email as string, password
 * as string and role as string.
 */
export interface AuthData {
  email: string;
  password: string;
  role: string;
}
