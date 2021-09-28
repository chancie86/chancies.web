using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chancies.Api.Controllers.Public.Document.Dto;
using chancies.Api.Controllers.Public.Document.Dto.Extensions;
using chancies.Blog.DataModels;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Mvc;

namespace chancies.Api.Controllers.Public.Document
{
    [ApiController]
    [Route("public/document")]
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
            var document = await _documentService.Get(id);

            if (!document.Published)
            {
                return Forbid();
            }

            return document.ToDocumentDto();
        }

        [HttpGet("{id}/images")]
        public async Task<IList<ImageReference>> ListImages(Guid id)
        {
            var result = await _imageService.List(id);
            return result;
        }
    }
}
