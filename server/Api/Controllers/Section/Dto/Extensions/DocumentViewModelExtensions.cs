namespace chancies.Api.Controllers.Section.Dto.Extensions
{
    public static class SectionExtensions
    {
        public static SectionDto ToDto(this Blog.DataModels.Section self)
        {
            return new SectionDto
            {
                Name = self.Name
            };
        }
    }
}
