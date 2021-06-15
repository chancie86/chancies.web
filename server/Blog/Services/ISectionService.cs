using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Services
{
    public interface ISectionService
    {
        Task<SectionId> Create(Section section);
        Task<Section> Get(SectionId id);
        Task<IList<Section>> Get();
        Task Delete(SectionId id);
        Task Update(Section section);
    }
}
