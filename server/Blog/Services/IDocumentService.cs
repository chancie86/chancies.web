using System;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.ViewModels;

namespace chancies.Blog.Services
{
    public interface IDocumentService
    {
        Task<Guid> Create(Document document);
        Task<DocumentViewModel> Get(Guid id);
        Task Delete(Guid id);
        Task Update(Document document);
    }
}
