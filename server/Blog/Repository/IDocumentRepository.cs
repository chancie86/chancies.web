using chancies.Blog.DataModels;

namespace chancies.Blog.Repository
{
    public interface IDocumentRepository
        : ICrudRepository<Document, DocumentId, DocumentListItem>
    {
    }
}
