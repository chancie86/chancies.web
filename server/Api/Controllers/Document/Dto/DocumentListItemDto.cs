﻿using System;

namespace chancies.Api.Controllers.Document.Dto
{
    public class DocumentListItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid SectionId { get; set; }
    }
}
