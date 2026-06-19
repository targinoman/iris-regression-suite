import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Service object for static assets served at the origin (outside `/api`), such as the
 * audit attachments. Concentrates paths and calls; assertions live in the tests.
 */
export class AssetsApi {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * `GET <origin>/<assetPath>`. Redirects are NOT followed, so a 3xx (e.g. to a login)
   * is observed as a protective non-200 rather than followed through to a 200 page.
   */
  download(assetPath: string): Promise<APIResponse> {
    return this.request.get(assetPath, { maxRedirects: 0 });
  }
}
