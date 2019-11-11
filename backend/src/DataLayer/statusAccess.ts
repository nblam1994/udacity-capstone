
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from "aws-sdk";
import {Types} from 'aws-sdk/clients/s3';
import { UpdateStatusRequest } from '../requests/UpdateStatusRequest';
import { StatusUpdate } from '../models/StatusUpdate';
import { StatusItem } from '../models/StatusItem'

export class StatusAccess {

    constructor( 
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly statusTable = process.env.STATUS_TABLE,
        private readonly S3Bucket = process.env.S3_BUCKET_NAME,
        private readonly s3Client: Types = new AWS.S3({signatureVersion: 'v4'}) ) {}
    

        async createStatus(statusItem: StatusItem): Promise<StatusItem> {

            const params = {
                TableName: this.statusTable,
                Item: statusItem
            };

            await this.docClient.put(params).promise()

            return statusItem as StatusItem;
        }


        async deleteStatus(statusId: String, userId: String): Promise<String> {

            const params = {
                TableName: this.statusTable,
                Key: {
                    "userId": userId,
                    "statusId": statusId
                },
            }; 
            await this.docClient.delete(params).promise();

            return "Deleted" as String;
        }


        async getStatuses(userId: String): Promise<StatusItem[]> {

            const params = {
                TableName: this.statusTable,
                KeyConditionExpression: "#userId = :userId",
                ExpressionAttributeNames: {
                    "#userId": "userId"
                },
                ExpressionAttributeValues: {
                    ":userId": userId
                }
            };
    
            const result = await this.docClient.query(params).promise();
            const items = result.Items;
    
            return items as StatusItem[]
        }


        async getPreSignedUrl(todoId: String): Promise<String> {

            const url = this.s3Client.getSignedUrl('putObject', {
                Bucket: this.S3Bucket,
                Key: todoId,
                Expires: 1000,
            });

            return url as String;
        }

        async updateStatus(updatedstatus: UpdateStatusRequest, todoId: String, userId: String) : Promise<StatusUpdate> {

            const params = {
                TableName: this.statusTable,
                Key: {
                    "userId": userId,
                    "statusId": todoId
                },
                UpdateExpression: "set #a = :a",
                ExpressionAttributeNames: {
                    "#a": "content",
                },
                ExpressionAttributeValues: {
                    ":a": updatedstatus['content']
                },
                ReturnValues: "ALL_NEW"
            };
    
            const result = await this.docClient.update(params).promise();
            const attributes = result.Attributes;
    
            return attributes as StatusUpdate;
        }

}