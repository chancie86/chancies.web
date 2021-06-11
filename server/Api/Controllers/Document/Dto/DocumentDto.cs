using System;
using chancies.Api.Controllers.Section.Dto;

namespace chancies.Api.Controllers.Document.Dto
{
    public class DocumentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public SectionDto Section { get; set; }
    }
}
