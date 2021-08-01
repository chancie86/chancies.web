using System.Collections.Generic;

namespace chancies.Blog.DataModels
{
    public class ImagesDocumentElement
        : DocumentElement
    {
        public IList<DocumentImage> Images { get; set; }
        public override DocumentElementType Type => DocumentElementType.Images;
    }
}
