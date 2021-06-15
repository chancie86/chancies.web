﻿using System;

namespace chancies.Blog.DataModels
{
    public class Document
        : BaseDataModel<DocumentId>
    {
        public SectionId SectionId { get; set; }

        public string Content { get; set; }
    }
}
