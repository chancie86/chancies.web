﻿using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.ViewModels;

namespace chancies.Blog.Services
{
    public interface IDocumentService
    {
        Task<DocumentId> Create(Document document);
        Task<DocumentViewModel> Get(DocumentId id);
        Task<IList<DocumentViewModel>> Get();
        Task Delete(DocumentId id);
        Task Update(Document document);
    }
}
