/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateStatusRequest {
  content: string
  userId: string
}