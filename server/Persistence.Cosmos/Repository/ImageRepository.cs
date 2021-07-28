using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;
using chancies.Blog.DataModels;
using chancies.Blog.Repository;
using chancies.Persistence.Cosmos.Config;
using Microsoft.Extensions.Options;
using Persistence.Cosmos;

namespace chancies.Persistence.Cosmos.Repository
{
    internal class ImageRepository
        : IImageRepository
    {
        private readonly AzureStorageConfig _storageConfig;
        private readonly ISecretsService _secretsService;

        public ImageRepository(IOptions<AzureConfig> config, ISecretsService secretsService)
        {
            _storageConfig = config?.Value.Storage ?? throw new ArgumentNullException(nameof(config), "Azure Storage config is missing");
            _secretsService = secretsService;
        }

        public async Task Upload(Stream fileStream, string path)
        {
            ValidateFileName(path);
            var blobUri = new Uri($"{BaseUrl}/{_storageConfig.ImageContainer}/{path}");
            var credential = await GetCredential();
            var blobClient = new BlobClient(blobUri, credential);
            await blobClient.UploadAsync(fileStream);
        }

        public async Task<IList<ImageReference>> List(string prefix)
        {
            var results = new Dictionary<string, string>();
            var credential = await GetCredential();
            var blobServiceClient = new BlobServiceClient(new Uri(BaseUrl), credential);
            
            var container = blobServiceClient.GetBlobContainerClient(_storageConfig.ImageContainer);

            if (!await container.ExistsAsync())
            {
                return new ImageReference[0];
            }

            await List(container, prefix, results);

            // Chop off the original prefix for the file paths
            return results.Select(x =>
            {
                var path = x.Key.Substring(prefix.Length + 1);
                return new ImageReference()
                {
                    Path = path,
                    Url = x.Value
                };
            }).ToList();
        }

        private async Task List(BlobContainerClient container, string prefix, IDictionary<string, string> results)
        {   
            // Call the listing operation and return pages of the specified size.
            var resultSegment = container
                .GetBlobsByHierarchyAsync(prefix: prefix, delimiter: "/")
                .AsPages();

            // Enumerate the blobs returned for each page.
            await foreach (var blobPage in resultSegment)
            {
                // A hierarchical listing may return both virtual directories and blobs.
                foreach (var blobHierarchyItem in blobPage.Values)
                {
                    if (blobHierarchyItem.IsPrefix)
                    {
                        // This is a virtual directory, traverse
                        await List(container, blobHierarchyItem.Prefix, results);
                    }
                    else if (blobHierarchyItem.IsBlob)
                    {
                        var blockBlobClient = container.GetBlockBlobClient(blobHierarchyItem.Blob.Name);
                        results[blobHierarchyItem.Blob.Name] = blockBlobClient.Uri.AbsoluteUri;
                    }
                }
            }
        }

        public async Task Delete(string path)
        {
            var blobUri = new Uri($"{BaseUrl}/{_storageConfig.ImageContainer}/{path}");
            var credential = await GetCredential();
            var blobClient = new BlobClient(blobUri, credential);
            _ = await blobClient.DeleteIfExistsAsync();
        }

        public static void ValidateFileName(string fileName)
        {
            var formats = new [] { ".jpg", ".png", ".gif", ".jpeg" };
            if (!formats.Any(item => fileName.EndsWith(item, StringComparison.OrdinalIgnoreCase)))
            {
                throw new ArgumentException("Invalid filename", nameof(fileName));
            }
        }
        
        private async Task<StorageSharedKeyCredential> GetCredential()
        {
            // Create StorageSharedKeyCredentials object by reading
            // the values from the configuration (appsettings.json)
            var storageKey = await _secretsService.GetSecret(_storageConfig.AccountKeySecretName);
            return new StorageSharedKeyCredential(_storageConfig.AccountName, storageKey);
        }

        private string BaseUrl => $"https://{_storageConfig.AccountName}.blob.core.windows.net";
    }
}
