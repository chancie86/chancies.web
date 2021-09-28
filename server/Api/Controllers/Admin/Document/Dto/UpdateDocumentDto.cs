using System;
using System.Collections.Generic;
using chancies.Blog.DataModels;

namespace chancies.Api.Controllers.Admin.Document.Dto
{
    public class UpdateDocumentDto
    {
        public string Name { get; set; }
        public IList<DocumentElement> Elements { get; set; }
        public Guid SectionId { get; set; }
    }
}
