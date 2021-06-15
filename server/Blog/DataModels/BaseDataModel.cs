using Newtonsoft.Json;

namespace chancies.Blog.DataModels
{
    public class BaseDataModel<TId>
    {
        [JsonProperty("id")]
        public TId Id { get; set; }
        public string Name { get; set; }
        public string Type => GetType().Name;
    }
}
