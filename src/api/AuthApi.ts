import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Service object for the authentication area. It concentrates paths and calls;
 * no assertions live here (those belong in the tests).
 */
export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * `POST /api/auth/login` (form-urlencoded), using the numeric `role_id`. The resulting
   * identity comes from the `iris_role_session` cookie; the credential is sent only here.
   */
  login(roleId: number, password: string): Promise<APIResponse> {
    return this.request.post('/api/auth/login', {
      form: { role_id: roleId, password },
    });
  }

  me(): Promise<APIResponse> {
    return this.request.get('/api/auth/me');
  }

  logout(): Promise<APIResponse> {
    return this.request.post('/api/auth/logout');
  }
}
