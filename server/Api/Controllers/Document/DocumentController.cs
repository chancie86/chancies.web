using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chancies.Api.Controllers.Document.Dto;
using chancies.Api.Controllers.Document.Dto.Extensions;
using chancies.Blog.DataModels;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chancies.Api.Controllers.Document
{
    [ApiController]
    [Route("document")]
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

        [HttpGet]
        public async Task<ActionResult<IList<DocumentListItemDto>>> List()
        {
            return (await _documentService.List()).Select(s => s.ToDocumentListItemDto()).ToArray();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDto>> GetById(Guid id)
        {
            return (await _documentService.Get(id)).ToDocumentDto();
        }

        [Authorize(Permissions.Document.Create)]
        [HttpPost]
        public async Task<Guid> Create(CreateDocumentDto dto)
        {
            return await _documentService.Create(dto.ToModel());
        }

        [Authorize(Permissions.Document.Delete)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _documentService.Delete(id);
            return base.NoContent();
        }

        [Authorize(Permissions.Document.Update)]
        [HttpPut("{id}")]
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

        [HttpGet("{id}/images")]
        public async Task<IList<ImageReference>> ListImages(Guid id)
        {
            var result = await _imageService.List(id);
            return result;
        }

        [HttpDelete("{id}/images")]
        public async Task<IActionResult> Delete(Guid id, string filePath)
        {
            await _imageService.Delete(id, filePath);
            return Ok();
        }

        [HttpPut("{id}/publish/")]
        public async Task<IActionResult> Publish(Guid id, bool publish)
        {
            await _documentService.Publish(id, publish);
            return NoContent();
        }
    }
}
