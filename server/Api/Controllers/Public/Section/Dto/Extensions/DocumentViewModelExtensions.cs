using chancies.Blog.DataModels;

namespace chancies.Api.Controllers.Public.Section.Dto.Extensions
{
    public static class SectionExtensions
    {
        public static SectionDto ToDto(this Blog.DataModels.Section self)
        {
            return new SectionDto
            {
                Id = self.Id,
                Name = self.Name
            };
        }

        public static SectionDto ToDto(this SectionListItem self)
        {
            return new SectionDto
            {
                Id = self.Id,
                Name = self.Name
            };
        }
    }
}
