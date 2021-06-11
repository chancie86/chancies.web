using chancies.Api.Controllers.Section.Dto;
using chancies.Blog.ViewModels;

namespace chancies.Api.Controllers.Document.Dto.Extensions
{
    public static class DocumentViewModelExtensions
    {
        public static DocumentDto ToDto(this DocumentViewModel self)
        {
            return new DocumentDto()
            {
                Content = self.Content,
                Id = self.Id,
                Name = self.Name,
                Section = new SectionDto()
                {
                    Id = self.Section.Id,
                    Name = self.Section.Name,
                }
            };
        }
    }
}
