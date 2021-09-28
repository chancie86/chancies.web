using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Api.Controllers.Admin.Document.Dto;
using chancies.Api.Controllers.Public.Document.Dto;
using chancies.Api.Controllers.Public.Document.Dto.Extensions;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chancies.Api.Controllers.Admin.Document
{
    [ApiController]
    [Authorize]
    [Route("admin/document")]
    public class DocumentController
        : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IImageService _imageService;

        public DocumentController(IDocumentService documentService, IImageService imageService)
        {
            _documentService = documentService;
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        [Authorize(Permissions.Document.Read)]
        public async Task<ActionResult<DocumentDto>> GetById(Guid id)
        {
            var document = await _documentService.Get(id);
            return document.ToDocumentDto();
        }

        [HttpPost]
        [Authorize(Permissions.Document.Create)]
        public async Task<Guid> Create(CreateDocumentDto dto)
        {
            return await _documentService.Create(dto.ToModel());
        }

        [HttpDelete("{id}")]
        [Authorize(Permissions.Document.Delete)]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _documentService.Delete(id);
            return base.NoContent();
        }

        [HttpPut("{id}")]
        [Authorize(Permissions.Document.Update)]
        public async Task<IActionResult> Update(Guid id, UpdateDocumentDto payload)
        {
            await _documentService.Update(new Blog.DataModels.Document
            {
                Id = id,
                Name = payload.Name,
                Elements = payload.Elements,
                SectionId = payload.SectionId
            });

            return NoContent();
        }

        [HttpPost("{id}/images")]
        [Authorize(Permissions.Document.Update)]
        public async Task<IActionResult> UploadImage(Guid id, ICollection<IFormFile> files)
        {
            if (files.Count == 0)
            {
                return BadRequest("No files received from the upload");
            }

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    await using var stream = formFile.OpenReadStream();
                    await _imageService.Upload(id, stream, formFile.FileName);
                }
            }

            return Ok();
        }

        [HttpDelete("{id}/images")]
        [Authorize(Permissions.Document.Delete)]
        public async Task<IActionResult> Delete(Guid id, string filePath)
        {
            await _imageService.Delete(id, filePath);
            return Ok();
        }

        [HttpPut("{id}/publish/")]
        [Authorize(Permissions.Document.Update)]
        public async Task<IActionResult> Publish(Guid id, bool publish)
        {
            await _documentService.Publish(id, publish);
            return NoContent();
        }
    }
}
