using System;

namespace chancies.Api.Controllers.Document.Dto
{
    public class CreateDocumentDto
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid SectionId { get; set; }

        public Blog.DataModels.Document ToModel()
        {
            return new Blog.DataModels.Document()
            {
                Content = Content,
                Name = Name,
                SectionId = SectionId
            };
        }
    }
}
