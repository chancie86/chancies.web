using System;
using chancies.Blog.Converters;
using Newtonsoft.Json;

namespace chancies.Blog.DataModels
{
    [JsonConverter(typeof(DocumentElementConverter))]
    public class DocumentElement
    {
        public DocumentElement()
        {
        }

        public virtual DocumentElementType Type => throw new NotImplementedException();

        public Guid Id { get; set; }
    }
}
