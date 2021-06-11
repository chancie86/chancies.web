using System.Threading.Tasks;

namespace Persistence.Cosmos
{
    public interface ISecretsService
    {
        Task<string> GetSecret(string name);
    }
}
