using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace chancies.Blog.Repository
{
    public interface IImageRepository
    {
        Task Upload(Stream fileStream, string path);

        Task<IList<string>> List(string prefix);

        Task Delete(string path);
    }
}
