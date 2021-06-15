using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.Repository;
using chancies.Blog.ViewModels;

namespace chancies.Blog.Services.Implementation
{
    public class DocumentService
        : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly ISectionRepository _sectionRepository;

        public DocumentService(IDocumentRepository documentRepository, ISectionRepository sectionRepository)
        {
            _documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            _sectionRepository = sectionRepository ?? throw new ArgumentNullException(nameof(sectionRepository));
        }

        public async Task<DocumentId> Create(Document document)
        {
            // Check section exists
            _ = await _sectionRepository.Read(document.SectionId);
            
            document.Id = Guid.NewGuid();
            return await _documentRepository.Create(document);
        }

        public async Task<DocumentViewModel> Get(DocumentId id)
        {
            var document = await _documentRepository.Read(id);
            var section = await _sectionRepository.Read(document.SectionId);
            return new DocumentViewModel(document, section);
        }

        public async Task<IList<DocumentViewModel>> Get()
        {
            var sections = (await _sectionRepository.Read()).ToDictionary(x => x.Id, x => x);
            var documents = await _documentRepository.Read();

            return documents.Select(d => new DocumentViewModel(d, sections[d.SectionId])).ToArray();
        }

        public async Task Delete(DocumentId id)
        {
            await _documentRepository.Delete(id);
        }

        public async Task Update(Document document)
        {
            await _documentRepository.Update(document);
        }
    }
}
