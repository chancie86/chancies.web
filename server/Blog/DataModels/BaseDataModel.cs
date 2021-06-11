using System;
using Newtonsoft.Json;

namespace chancies.Blog.DataModels
{
    public class BaseDataModel
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type => GetType().Name;
    }
}
