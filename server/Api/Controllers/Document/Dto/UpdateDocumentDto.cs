using System;

namespace chancies.Api.Controllers.Document.Dto
{
    public class UpdateDocumentDto
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid SectionId { get; set; }
    }
}
