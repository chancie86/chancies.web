using chancies.Blog.DataModels;
using chancies.Blog.Repository;

namespace chancies.Persistence.Cosmos.Repository
{
    public class SectionRepository
        : BaseRepository<Section, SectionId, SectionListItem>, ISectionRepository
    {
        public SectionRepository(ICosmosService cosmosService)
            : base(cosmosService)
        {
        }
    }
}
