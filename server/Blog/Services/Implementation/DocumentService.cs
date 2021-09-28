using System;
using System.Collections.Generic;
using System.IO;
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
            document.Created = document.LastUpdated = DateTime.UtcNow;

            document.Elements ??= new List<DocumentElement>();
            ValidateDocumentElement(document.Elements);

            return await _documentRepository.Create(document);
        }

        public async Task<DocumentViewModel> Get(DocumentId id)
        {
            var document = await _documentRepository.Read(id);
            var section = await _sectionRepository.Read(document.SectionId);
            return new DocumentViewModel(document, section);
        }

        public async Task<IList<DocumentListItem>> List()
        {
            return await _documentRepository.List();
        }

        public async Task Delete(DocumentId id)
        {
            await _documentRepository.Delete(id);
        }

        public async Task Update(Document document)
        {
            ValidateDocumentElement(document.Elements);

            var doc = await _documentRepository.Read(document.Id);
            document.Created = doc.Created;
            document.LastUpdated = DateTime.UtcNow;
            document.Published = doc.Published;
            await _documentRepository.Update(document);
        }

        public async Task Publish(DocumentId id, bool publish)
        {
            var document = await _documentRepository.Read(id);
            document.Published = publish;
            await _documentRepository.Update(document);
        }

        private void ValidateDocumentElement(IList<DocumentElement> elements)
        {
            var ids = elements.Select(x => x.Id).ToHashSet();
            if (ids.Count != elements.Count)
            {
                throw new InvalidDataException($"{nameof(DocumentElement)} ids must be unique");
            }
        }
    }
}
