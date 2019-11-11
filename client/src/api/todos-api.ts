import { apiEndpoint } from '../config'
import { Status } from '../types/Todo';
import { CreateStatusRequest } from '../types/CreateStatusRequest';
import Axios from 'axios'
import { UpdateStatusRequest } from '../types/UpdateStatusRequest';

export async function getTodos(idToken: string): Promise<Status[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/status`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newStatus: CreateStatusRequest
): Promise<Status> {
  const response = await Axios.post(`${apiEndpoint}/status`,  JSON.stringify(newStatus), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchTodo(
  idToken: string,
  statusId: string,
  updatedTodo: UpdateStatusRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/todos/${statusId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  statusId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/status/${statusId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  statusId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/status/${statusId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
