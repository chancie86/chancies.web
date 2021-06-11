using chancies.Blog.DataModels;
using chancies.Blog.Repository;

namespace chancies.Persistence.Cosmos.Blog
{
    internal class DocumentRepository
        : BaseRepository<Document>, IDocumentRepository
    {
        public DocumentRepository(ICosmosService cosmosService)
            : base(cosmosService)
        {
        }
    }
}
