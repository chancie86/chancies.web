using Newtonsoft.Json;

namespace chancies.Blog.DataModels
{
    public abstract class BaseDataModel<TId>
    {
        public TId Id { get; set; }
        public string Name { get; set; }
        public string Type => GetType().Name;
    }
}
