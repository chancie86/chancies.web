using System;
using System.Threading.Tasks;
using chancies.Api.Controllers.Document.Dto;
using chancies.Api.Controllers.Document.Dto.Extensions;
using chancies.Api.Permissions;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace chancies.Api.Controllers.Document
{
    [ApiController]
    [Route("document")]
    public class DocumentController
        : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        //[Authorize(Permissions.Document.Read)]
        //[HttpGet]
        //public async Task<ActionResult<DocumentDto>> List()
        //{
        //    return (await _documentService.Get()).ToDto();
        //}

        [Authorize(Permissions.Document.Read)]
        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDto>> GetById(Guid id)
        {
            return (await _documentService.Get(id)).ToDto();
        }

        [Authorize(Permissions.Document.Read)]
        [HttpPost]
        public async Task<Guid> Create(CreateDocumentDto dto)
        {
            return await _documentService.Create(dto.ToModel());
        }

        [Authorize(Permissions.Document.Delete)]
        [HttpDelete("id")]
        public async Task Delete(Guid id)
        {
            await _documentService.Delete(id);
        }
    }
}
