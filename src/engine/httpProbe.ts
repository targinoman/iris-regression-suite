import { APIRequestContext, APIResponse } from '@playwright/test';
import { NONEXISTENT_ID } from '../config';
import { AuthCase } from './authCase';

/** Fills the `{id}` placeholder, if present, with the case's probe id. */
export function resolvePath(c: AuthCase): string {
  if (!c.pathTemplate.includes('{id}')) return c.pathTemplate;
  const id = c.probeId ?? NONEXISTENT_ID;
  return c.pathTemplate.replace('{id}', encodeURIComponent(id));
}

/**
 * Dispatches the probe for a case and returns the raw response. Bodies are chosen so
 * nothing is mutated: PATCH sends an empty object (a no-op against a non-existent id),
 * and create-invalid-body sends an empty object (which fails required-field validation).
 */
export function executeProbe(request: APIRequestContext, c: AuthCase): Promise<APIResponse> {
  const path = resolvePath(c);
  switch (c.method) {
    case 'GET':
      return request.get(path);
    case 'DELETE':
      return request.delete(path);
    case 'PATCH':
      return request.patch(path, { data: {} });
    case 'POST':
      return c.probe === 'create-invalid-body'
        ? request.post(path, { data: {} })
        : request.post(path);
  }
}
