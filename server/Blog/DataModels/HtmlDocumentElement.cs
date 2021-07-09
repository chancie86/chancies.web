namespace chancies.Blog.DataModels
{
    public class HtmlDocumentElement
        : DocumentElement
    {
        public string Content { get; set; }
        public override DocumentElementType Type => DocumentElementType.Html;
    }
}
