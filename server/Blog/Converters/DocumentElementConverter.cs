using System;
using System.IO;
using chancies.Blog.DataModels;
using chancies.Core.Converters;
using Newtonsoft.Json.Linq;

namespace chancies.Blog.Converters
{
    public class DocumentElementConverter : JsonCreationConverter<DocumentElement>
    {
        protected override DocumentElement Create(Type objectType, JObject jObject)
        {
            if (jObject == null)
            {
                throw new ArgumentNullException(nameof(jObject));
            }
            
            var typeValue = jObject[nameof(DocumentElement.Type).ToLowerInvariant()].Value<string>();
            var type = Enum.Parse<DocumentElementType>(typeValue);
            
            switch (type)
            {
                case DocumentElementType.Html:
                    return new HtmlDocumentElement();
                case DocumentElementType.Images:
                    return new ImagesDocumentElement();
                case DocumentElementType.Video:
                    return new VideoDocumentElement();
                default:
                    throw new InvalidDataException($"Type not specified");
            }
        }
    }
}
