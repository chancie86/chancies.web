namespace chancies.Blog.DataModels
{
    public class DocumentListItem
        : BaseDataModel<DocumentId>
    {
        public SectionId SectionId { get; set; }
    }
}
