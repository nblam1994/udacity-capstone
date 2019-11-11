import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateStatusRequest } from '../../requests/UpdateStatusRequest'

import { getUserId } from '../utils'

import { updateStatusItem } from '../../BusinessLogic/status'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateStatusRequest = JSON.parse(event.body)
  const userId = getUserId(event);
  const todoUpdate = await updateStatusItem(updatedTodo, todoId, userId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      "item": todoUpdate
    })
  }
}
