import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  // As users are outside the DB, username is used as userID for simplicity
  return request.user && request.user.name;
}
