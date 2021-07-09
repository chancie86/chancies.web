using System;
using System.Collections.Generic;
using chancies.Api.Controllers.Section.Dto;
using chancies.Blog.DataModels;

namespace chancies.Api.Controllers.Document.Dto
{
    public class DocumentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastUpdated { get; set; }
        public IList<DocumentElement> Elements { get; set; }
        public SectionDto Section { get; set; }
    }
}
