using System;
using System.Threading.Tasks;
using chancies.Api.Controllers.Document.Dto;
using chancies.Api.Controllers.Document.Dto.Extensions;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace chancies.Api.Controllers.Document
{
    [ApiController]
    [Route("document")]
    public class DocumentController
        : ControllerBase
    {

        private readonly ILogger<DocumentController> _logger;
        private readonly IDocumentService _documentService;

        public DocumentController(ILogger<DocumentController> logger, IDocumentService documentService)
        {
            _logger = logger;
            _documentService = documentService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDto>> GetById(Guid id)
        {
            return (await _documentService.Get(id)).ToDto();
        }

        [HttpPost]
        public async Task<Guid> Create(CreateDocumentDto dto)
        {
            return await _documentService.Create(dto.ToModel());
        }

        [HttpDelete("id")]
        public async Task Delete(Guid id)
        {
            await _documentService.Delete(id);
        }
    }
}
