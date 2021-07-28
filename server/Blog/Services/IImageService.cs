using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Services
{
    public interface IImageService
    {
        Task Upload(DocumentId documentId, Stream fileStream, string filePath);
        Task<IList<ImageReference>> List(DocumentId documentId);
        Task Delete(DocumentId documentId, string filePath);
    }
}
