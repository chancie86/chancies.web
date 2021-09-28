using chancies.Api.Controllers.Section.Dto;
using chancies.Blog.DataModels;
using chancies.Blog.ViewModels;

namespace chancies.Api.Controllers.Document.Dto.Extensions
{
    public static class DocumentViewModelExtensions
    {
        public static DocumentDto ToDocumentDto(this DocumentViewModel self)
        {
            return new DocumentDto
            {
                Elements = self.Elements,
                Id = self.Id,
                Name = self.Name,
                Created = self.Created,
                LastUpdated = self.LastUpdated,
                Section = new SectionDto
                {
                    Id = self.Section.Id,
                    Name = self.Section.Name,
                },
                Published = self.Published
            };
        }

        public static DocumentListItemDto ToDocumentListItemDto(this DocumentListItem self)
        {
            return new DocumentListItemDto
            {
                Id = self.Id,
                Name = self.Name,
                SectionId = self.SectionId,
                Published = self.Published
            };
        }
    }
}
