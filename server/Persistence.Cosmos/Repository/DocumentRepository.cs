using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.Repository;

namespace chancies.Persistence.Cosmos.Repository
{
    internal class DocumentRepository
        : BaseRepository<Document, DocumentId, DocumentListItem>, IDocumentRepository
    {
        public DocumentRepository(ICosmosService cosmosService)
            : base(cosmosService)
        {
        }

        public override async Task<IList<DocumentListItem>> List()
        {
            return await ListInternal("sectionId", "published");
        }
    }
}
