using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Services
{
    public interface ISectionService
    {
        Task<SectionId> Create(Section section);
        Task<Section> Get(SectionId id);
        Task<IList<SectionListItem>> List();
        Task Delete(SectionId id);
        Task Update(Section section);
    }
}
