using System;
using System.Linq;
using System.Threading.Tasks;
using Autofac;

namespace chancies.Persistence.Cosmos.Startup
{
    public class Initialiser
        : IStartable
    {
        private readonly ICosmosService _cosmosService;
        
        public Initialiser(ICosmosService cosmosService)
        {
            _cosmosService = cosmosService ?? throw new ArgumentNullException();
        }

        public void Start()
        {
            var initialisers = new Func<Task>[]
            {
                InitialiseCosmos
            };

            Task.WaitAll(initialisers.Select(Task.Run).ToArray());
        }

        public async Task InitialiseCosmos()
        {
            await _cosmosService.Initialize();
        }
    }
}
