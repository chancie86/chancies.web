using chancies.Blog.DataModels;

namespace chancies.Blog.Repository
{
    public interface ISectionRepository
        : ICrudRepository<Section, SectionId, SectionListItem>
    {
    }
}
