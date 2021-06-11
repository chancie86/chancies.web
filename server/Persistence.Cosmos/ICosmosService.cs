using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace chancies.Persistence.Cosmos
{
    public interface ICosmosService
    {
        Task Initialize();

        Container GetContainer();
    }
}
