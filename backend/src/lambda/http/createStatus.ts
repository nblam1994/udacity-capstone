import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateStatusRequest } from '../../requests/CreateStatusRequest'

import { getUserId } from '../utils'

import { createStatus } from '../../BusinessLogic/status'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newStatus: CreateStatusRequest = JSON.parse(event.body);
  const userId = getUserId(event);
  const statusItem = await createStatus(newStatus, userId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(statusItem)
  }
}
