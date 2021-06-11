using System;

namespace chancies.Blog.DataModels
{
    public class Document
        : BaseDataModel
    {
        public Guid SectionId { get; set; }

        public string Content { get; set; }
    }
}
