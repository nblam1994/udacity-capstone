# Capstone project for Udacity Cloud

This project is the capstone project for Udacity Nanodegree, which uses serverless technology

# Serverless Status Tracking

This keeps all user status that they post, this can see as a digital diary

# Functionality of the application

This application will allow creating/removing/updating/fetching status items. Each status item can optionally have an attachment image. Each user only has access to status items that he/she has created.

# status items

The application should store TODO items, and each TODO item contains the following fields:

* `statusId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `UserId` (string) - id of the user status belongs to 
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item


# Frontend

The `client` folder contains a web application that can use the API that should be developed in the project.

This frontend should work with your serverless application once it is developed, you don't need to make any changes to the code. The only file that you need to edit is the `config.ts` file in the `client` folder. This file configures your client application just as it was done in the course and contains an API endpoint and Auth0 configuration:

```ts
const apiId = '...' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: '...',    // Domain from Auth0
  clientId: '...',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}
```

## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.ts` file in the `client` folder. We recommend using asymmetrically encrypted JWT tokens.

# Best practices

To complete this exercise, please follow the best practices from the 6th lesson of this course.

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

