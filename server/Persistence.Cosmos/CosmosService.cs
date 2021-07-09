using System;
using System.Threading.Tasks;
using chancies.Persistence.Cosmos.Config;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Extensions.Options;
using Persistence.Cosmos;

namespace chancies.Persistence.Cosmos
{
    internal class CosmosService
        : ICosmosService, IDisposable
    {
        private readonly ISecretsService _secretsService;
        private readonly CosmosConfig _config;

        private Container _container;
        private Database _database;
        private CosmosClient _cosmosClient;

        private bool _initialised;

        public CosmosService(IOptions<CosmosConfig> config, ISecretsService secretsService)
        {
            _config = config?.Value ?? throw new ArgumentNullException(nameof(config));
            _secretsService = secretsService ?? throw new ArgumentNullException(nameof(secretsService));
        }

        public async Task Initialize()
        {
            if (_initialised)
            {
                return;
            }

            var primaryKey = await _secretsService.GetSecret("cosmosPrimaryKey");
            var builder = new CosmosClientBuilder(_config.CosmosEndpointUrl, primaryKey)
                .WithSerializerOptions(new CosmosSerializationOptions()
                    {PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase});
            _cosmosClient = builder.Build();
            _database = await _cosmosClient.CreateDatabaseIfNotExistsAsync(_config.DatabaseName);
            _container = await _database.CreateContainerIfNotExistsAsync(_config.ContainerName, $"/{Constants.PartitionKey}", 400);

            _initialised = true;
        }

        public Container GetContainer()
        {
            return _container;
        }

        public void Dispose()
        {
            _cosmosClient?.Dispose();
        }
    }
}
