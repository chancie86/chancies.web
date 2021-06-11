using System;
using System.Threading.Tasks;
using chancies.Api.Controllers.Section.Dto;
using chancies.Api.Controllers.Section.Dto.Extensions;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Mvc;

namespace chancies.Api.Controllers.Section
{
    [ApiController]
    [Route("section")]
    public class SectionController
        : ControllerBase
    {
        private readonly ISectionService _sectionService;

        public SectionController(ISectionService sectionService)
        {
            _sectionService = sectionService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDto>> GetById(Guid id)
        {
            return (await _sectionService.Get(id)).ToDto();
        }

        [HttpPost]
        public async Task<Guid> Create(CreateSectionDto dto)
        {
            return await _sectionService.Create(new Blog.DataModels.Section
            {
                Name = dto.Name
            });
        }

        [HttpDelete("id")]
        public async Task Delete(Guid id)
        {
            await _sectionService.Delete(id);
        }
    }
}
