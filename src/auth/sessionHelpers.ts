import { request, APIRequestContext } from '@playwright/test';
import { AuthApi } from '../api/AuthApi';
import { BASE_URL, CASE_TOKEN, COOKIE_NAME } from '../config';

type StorageState = Awaited<ReturnType<APIRequestContext['storageState']>>;

/** Outcome of a `/api/auth/me` probe, read before the context is disposed. */
export interface MeResult {
  status: number;
  body: string;
}

function headers(token: string): Record<string, string> {
  return { 'X-Case-Token': token };
}

/** Logs in and captures the resulting storage state (carrying the signed role cookie). */
export async function loginStorageState(roleId: number, password: string): Promise<StorageState> {
  const context = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: headers(CASE_TOKEN),
  });
  const res = await new AuthApi(context).login(roleId, password);
  if (!res.ok()) {
    throw new Error(`login failed (HTTP ${res.status()})`);
  }
  const state = await context.storageState();
  await context.dispose();
  return state;
}

/** The current value of the signed role-session cookie in a storage state. */
export function roleCookieValue(state: StorageState): string {
  const cookie = state.cookies.find((c) => c.name === COOKIE_NAME);
  if (cookie === undefined) {
    throw new Error(`${COOKIE_NAME} cookie not found after login`);
  }
  return cookie.value;
}

function stateWithCookie(state: StorageState, cookieValue: string): StorageState {
  return {
    cookies: state.cookies.map((c) => (c.name === COOKIE_NAME ? { ...c, value: cookieValue } : c)),
    origins: state.origins,
  };
}

/** Calls `GET /api/auth/me` with a given cookie value and case token; reads status + body. */
export async function getMe(
  state: StorageState,
  cookieValue: string,
  token: string,
): Promise<MeResult> {
  const context = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: headers(token),
    storageState: stateWithCookie(state, cookieValue),
  });
  const res = await new AuthApi(context).me();
  const result: MeResult = { status: res.status(), body: await res.text() };
  await context.dispose();
  return result;
}

/** Calls `POST /api/auth/logout` carrying the given cookie value. */
export async function logoutWith(
  state: StorageState,
  cookieValue: string,
  token: string,
): Promise<void> {
  const context = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: headers(token),
    storageState: stateWithCookie(state, cookieValue),
  });
  await new AuthApi(context).logout();
  await context.dispose();
}

/** Replaces the role segment of a `<role>.<ts>.<sig>` cookie, keeping the signature. */
export function tamperRole(cookieValue: string, newRole: string): string {
  const parts = cookieValue.split('.');
  parts[0] = newRole;
  return parts.join('.');
}

/** Builds a `<role>.<ts>.` value (timestamp kept, signature emptied). */
export function withEmptySignature(cookieValue: string, role: string): string {
  const timestamp = cookieValue.split('.')[1] ?? '';
  return `${role}.${timestamp}.`;
}

/** Parses the `detail` message from a JSON error body, or '' if absent / not JSON. */
export function detailOf(body: string): string {
  try {
    const parsed = JSON.parse(body) as { detail?: unknown };
    return typeof parsed.detail === 'string' ? parsed.detail : '';
  } catch {
    return '';
  }
}

/** Flips a single character so the result is guaranteed different from the input. */
export function flipOneChar(value: string): string {
  if (value.length === 0) {
    return 'x';
  }
  const first = value[0];
  const replacement = first === 'a' ? 'b' : 'a';
  return replacement + value.slice(1);
}
