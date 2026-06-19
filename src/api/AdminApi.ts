import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Service object for the admin resource area. Concentrates paths and calls;
 * assertions live in the tests.
 */
export class AdminApi {
  constructor(private readonly request: APIRequestContext) {}

  /** `GET /api/admin/subjects/{id}` — single subject record by id. */
  getSubject(subjectId: string): Promise<APIResponse> {
    return this.request.get(`/api/admin/subjects/${encodeURIComponent(subjectId)}`);
  }

  /** `GET /api/admin/subjects` — subject list. */
  listSubjects(): Promise<APIResponse> {
    return this.request.get('/api/admin/subjects');
  }

  /** `GET /api/admin/chambers` — chamber list. */
  listChambers(): Promise<APIResponse> {
    return this.request.get('/api/admin/chambers');
  }

  /** `GET /api/admin/dashboard` — QE index internals. */
  dashboard(): Promise<APIResponse> {
    return this.request.get('/api/admin/dashboard');
  }

  /** `GET /api/admin/audit` — institutional audit log. */
  audit(): Promise<APIResponse> {
    return this.request.get('/api/admin/audit');
  }
}
