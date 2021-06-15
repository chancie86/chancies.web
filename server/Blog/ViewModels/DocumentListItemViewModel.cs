using System;
using chancies.Blog.DataModels;

namespace chancies.Blog.ViewModels
{
    public class DocumentListItemViewModel
    {
        private readonly DocumentListItem _document;

        public DocumentListItemViewModel(DocumentListItem document, SectionId sectionId)
        {
            _document = document ?? throw new ArgumentNullException(nameof(document));
            SectionId = sectionId;
        }

        public DocumentId Id => _document.Id;

        public string Name => _document.Name;

        public SectionId SectionId { get; }
    }
}
