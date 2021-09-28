using System;
using System.Collections.Generic;
using chancies.Blog.DataModels;

namespace chancies.Api.Controllers.Admin.Document.Dto
{
    public class CreateDocumentDto
    {
        public string Name { get; set; }
        public IList<DocumentElement> Elements { get; set; }
        public Guid SectionId { get; set; }

        public Blog.DataModels.Document ToModel()
        {
            return new Blog.DataModels.Document
            {
                Elements = Elements,
                Name = Name,
                SectionId = SectionId
            };
        }
    }
}
