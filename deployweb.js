const glob = require("glob");
const fs = require("fs").promises;

const { ContainerClient } = require("@azure/storage-blob");

async function uploadToStorageBlob(filepath) {

    const account = "cs11003200234991e28"
    const containerName = "$web"
    const sasToken = "sp=racwd&st=2023-05-27T04:49:33Z&se=2023-05-27T12:49:33Z&sv=2022-11-02&sr=c&sig=NRQfuRwPc8ID15wWmmlRiIX76J07Ymr4BoimLRpWe5E%3D"
    const containerSasUrl = `https://${account}.blob.core.windows.net/${containerName}?${sasToken}`;

    const data = await fs.readFile(filepath);
    const filename = filepath.replace('/assets', '')

    const containerClient = new ContainerClient(containerSasUrl);
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    await blockBlobClient.upload(data, data.length);

    console.log(`Successfully uploaded ${filename} to Azure Storage Blob!`);
}


glob(
    "./**/*.html",
    {
        ignore: ["./node_modules/**/*", "./assets/**/*", "./dist/**/*"],
    },
    (_, files) => {
        files.forEach(async (file) => {
            const fullPath = `./${file}`;
           // console.log(fullPath)
            uploadToStorageBlob(fullPath).catch((err) => console.error(err));

        });
    }
);

glob(
    "./**/*.css",
    {
        ignore: ["./node_modules/**/*", "./assets/**/*", "./dist/**/*"],
    },
    (_, files) => {
        files.forEach(async (file) => {
            const fullPath = `./${file}`;
           // console.log(fullPath)
            uploadToStorageBlob(fullPath).catch((err) => console.error(err));

        });
    }
);

