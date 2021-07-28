namespace chancies.Persistence.Cosmos.Config
{
    public class AzureConfig
    {
        public string KeyVaultUrl { get; set; }
        public AzureStorageConfig Storage { get; set; }
        public CosmosConfig Cosmos { get; set; }
    }
}
