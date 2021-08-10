using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace chancies.Blog.DataModels
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum DocumentElementType
    {
        Html,
        Images,
        Video
    }
}
