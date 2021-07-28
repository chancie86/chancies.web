using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Repository
{
    public interface IImageRepository
    {
        Task Upload(Stream fileStream, string path);

        Task<IList<ImageReference>> List(string prefix);

        Task Delete(string path);
    }
}
