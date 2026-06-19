import { APIRequestContext, APIResponse } from '@playwright/test';
import { TestSessionCreate } from '../types/models';

/**
 * Service object for the test-session area. Concentrates paths and calls;
 * assertions and response parsing live in the tests / factory.
 */
export class SessionsApi {
  constructor(private readonly request: APIRequestContext) {}

  private base(id: string): string {
    return `/api/admin/sessions/${encodeURIComponent(id)}`;
  }

  list(): Promise<APIResponse> {
    return this.request.get('/api/admin/sessions');
  }

  get(id: string): Promise<APIResponse> {
    return this.request.get(this.base(id));
  }

  create(body: TestSessionCreate): Promise<APIResponse> {
    return this.request.post('/api/admin/sessions', { data: body });
  }

  approve(id: string): Promise<APIResponse> {
    return this.request.post(`${this.base(id)}/approve`);
  }

  reject(id: string): Promise<APIResponse> {
    return this.request.post(`${this.base(id)}/reject`);
  }

  start(id: string): Promise<APIResponse> {
    return this.request.post(`${this.base(id)}/start`);
  }

  complete(id: string): Promise<APIResponse> {
    return this.request.post(`${this.base(id)}/complete`);
  }

  cancel(id: string): Promise<APIResponse> {
    return this.request.post(`${this.base(id)}/cancel`);
  }
}
