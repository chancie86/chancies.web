using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;

namespace chancies.Blog.Repository
{
    public interface ICrudRepository<TDocument, TId, TList>
        where TDocument : BaseDataModel<TId>
        where TList : BaseDataModel<TId>
    {
        Task<TId> Create(TDocument document);
        Task Delete(TId id);
        Task<IList<TList>> List();
        Task<TDocument> Read(TId id);
        Task Update(TDocument document);
    }
}
