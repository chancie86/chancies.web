using System;

namespace chancies.Api.Controllers.Public.Document.Dto
{
    public class DocumentListItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid SectionId { get; set; }
        public bool Published { get; set; }
    }
}
