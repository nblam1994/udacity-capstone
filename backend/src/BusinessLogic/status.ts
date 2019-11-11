import { CreateStatusRequest } from '../requests/CreateStatusRequest';
import { StatusItem } from '../models/StatusItem';
import * as uuid from 'uuid';
import { StatusAccess } from  '../DataLayer/statusAccess';
import { UpdateStatusRequest } from '../requests/UpdateStatusRequest';
import { StatusUpdate } from '../models/StatusUpdate';

const statusAccess = new StatusAccess();

export async function createStatus(createStatusRequest: CreateStatusRequest, userId: string) : Promise<StatusItem> {

    const uniqueID = uuid.v4();
    const statusItem = {
      statusId: uniqueID,
      createdAt: new Date().getTime().toString(),
      userId: userId,
      ...createStatusRequest
    }

    return statusAccess.createStatus(statusItem);
}

export async function deleteStatus(statusId: string, userId: string) : Promise<String> {
    return statusAccess.deleteStatus(statusId, userId);
}

export async function getStatuses(userId: string) : Promise<StatusItem[]> {
    return statusAccess.getStatuses(userId);
}

export async function getPreSingedUrl(statusId: string): Promise<String> {
    return statusAccess.getPreSignedUrl(statusId);
}

export async function updateStatusItem(updatedStatus: UpdateStatusRequest, statusId: string, userId: string): Promise<StatusUpdate> {
    return statusAccess.updateStatus(updatedStatus, statusId, userId);
}