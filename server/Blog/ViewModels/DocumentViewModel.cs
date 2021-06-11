using System;
using chancies.Blog.DataModels;

namespace chancies.Blog.ViewModels
{
    public class DocumentViewModel
    {
        public DocumentViewModel(Document document, Section section)
        {
            Document = document;
            Section = section;
        }

        public Guid Id => Document.Id;

        public string Name => Document.Name;

        public string Content => Document.Content;

        public Section Section { get; }

        private Document Document { get; }
    }
}
