using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Repository
{
    public interface ICrudRepository<TDocument>
        where TDocument : BaseDataModel
    {
        Task<Guid> Create(TDocument document);
        Task Delete(Guid id);
        Task<IList<TDocument>> Read();
        Task<TDocument> Read(Guid id);
        Task Update(TDocument document);
    }
}
