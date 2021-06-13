using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Services
{
    public interface ISectionService
    {
        Task<Guid> Create(Section section);
        Task<Section> Get(Guid id);
        Task<IList<Section>> Get();
        Task Delete(Guid id);
        Task Update(Section section);
    }
}
