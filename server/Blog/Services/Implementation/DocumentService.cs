using System;
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

        public async Task<Guid> Create(Document document)
        {
            document.Id = Guid.NewGuid();
            return await _documentRepository.Create(document);
        }

        public async Task<DocumentViewModel> Get(Guid id)
        {
            var document = await _documentRepository.Read(id);
            var section = await _sectionRepository.Read(document.SectionId);
            return new DocumentViewModel(document, section);
        }

        public async Task Delete(Guid id)
        {
            await _documentRepository.Delete(id);
        }

        public async Task Update(Document document)
        {
            await _documentRepository.Update(document);
        }
    }
}
