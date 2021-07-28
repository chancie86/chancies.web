namespace chancies.Persistence.Cosmos.Config
{
    public class CosmosConfig
    {
        public string CosmosEndpointUrl { get; set; }
        
        public string DatabaseName { get; set; }

        public string ContainerName { get; set; }
        public string KeySecretName { get; set; }
    }
}
