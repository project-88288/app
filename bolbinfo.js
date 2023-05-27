#!/usr/bin/env node
const { BlobServiceClient } = require("@azure/storage-blob");

const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString);

async function main() {
    console.log('Hello, World!');
    const containerName = '...';
const containerClient = blobServiceClient.getContainerClient(containerName);

let blobs = containerClient.listBlobsFlat();
for await (const blob of blobs) {
  console.log(`${blob.name} --> Created: ${blob.properties.createdOn}   Size: ${blob.properties.contentLength}`);
}
}

async function createContainer() {
// Create a container (folder) if it does not exist
const containerName = 'photos';
const containerClient = blobServiceClient.getContainerClient(containerName);
const containerExists = await containerClient.exists()
if ( !containerExists) {
    const createContainerResponse = await containerClient.createIfNotExists();
    console.log(`Create container ${containerName} successfully`, createContainerResponse.succeeded);
}
else {
    console.log(`Container ${containerName} already exists`);
}

}

main();