using System;
using System.Collections.Generic;
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

        public DocumentId Id => Document.Id;

        public string Name => Document.Name;

        public DateTime Created => Document.Created;

        public DateTime LastUpdated => Document.LastUpdated;

        public IList<DocumentElement> Elements => Document.Elements;

        public Section Section { get; }

        public bool Published => Document.Published;

        private Document Document { get; }
    }
}
