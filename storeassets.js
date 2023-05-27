const glob = require("glob");
const fs = require("fs").promises;

const { ContainerClient } = require("@azure/storage-blob");

async function uploadToStorageBlob(filepath) {
  // For example, in Azure public cloud, a container SAS URL has the form of
  // `https://${account}.blob.core.windows.net/${containerName}?${sasToken}`

  const account = "cs11003200234991e28"
  const containerName = "assets"
  const sasToken = "sp=cwd&st=2023-05-27T03:40:54Z&se=2023-05-27T11:40:54Z&spr=https&sv=2022-11-02&sr=c&sig=CY62PUvlAm5cZxMnYS%2F7816L5ElxxxxVtHfu00KhiS4%3D"
  const containerSasUrl = `https://${account}.blob.core.windows.net/${containerName}?${sasToken}`;

  const data = await fs.readFile(filepath);
  const filename = filepath.replace('/assets', '')

  const containerClient = new ContainerClient(containerSasUrl);
  const blockBlobClient = containerClient.getBlockBlobClient(filename);

  await blockBlobClient.upload(data, data.length);

  console.log(`Successfully uploaded ${filename} to Azure Storage Blob!`);
}

// Find all JavaScript config files and convert them to JSON.
glob(
  "./assets/**/*",
  {
    ignore: ["index.js", "node_modules/**"],
  },
  (_, files) => {
    files.forEach(async (file) => {
      const fullPath = `./${file}`;
      console.log(fullPath)



      uploadToStorageBlob(fullPath).catch((err) => console.error(err));

      


    });
  }
);

