﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chancies.Api.Controllers.Document.Dto;
using chancies.Api.Controllers.Document.Dto.Extensions;
using chancies.Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [HttpDelete("id")]
        public async Task Delete(Guid id)
        {
            await _documentService.Delete(id);
        }

        [Authorize(Permissions.Document.Update)]
        [HttpPut("id")]
        public async Task Update(DocumentDto section)
        {
            await _documentService.Update(new Blog.DataModels.Document
            {
                Id = section.Id,
                Name = section.Name,
                Content = section.Content,
                SectionId = section.Section.Id
            });
        }
    }
}
