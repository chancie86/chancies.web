using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chancies.Api.Controllers.Section.Dto;
using chancies.Api.Controllers.Section.Dto.Extensions;
using chancies.Blog.DataModels;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        public async Task<ActionResult<IList<SectionDto>>> List()
        {
            return (await _sectionService.List()).Select(s => s.ToDto()).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDto>> GetById(Guid id)
        {
            return (await _sectionService.Get(id)).ToDto();
        }

        [Authorize(Permissions.Section.Create)]
        [HttpPost]
        public async Task<ActionResult<SectionId>> Create(CreateSectionDto dto)
        {
            return await _sectionService.Create(new Blog.DataModels.Section
            {
                Name = dto.Name
            });
        }

        [Authorize(Permissions.Section.Delete)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _sectionService.Delete(id);
            return base.NoContent();
        }

        [Authorize(Permissions.Section.Update)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateSectionDto payload)
        {
            await _sectionService.Update(new Blog.DataModels.Section
            {
                Id = id,
                Name = payload.Name
            });
            return base.NoContent();
        }
    }
}
