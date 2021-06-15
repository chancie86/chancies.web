using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Repository
{
    public interface ICrudRepository<TDocument, TId>
        where TDocument : BaseDataModel<TId>
    {
        Task<TId> Create(TDocument document);
        Task Delete(TId id);
        Task<IList<TDocument>> Read();
        Task<TDocument> Read(TId id);
        Task Update(TDocument document);
    }
}
