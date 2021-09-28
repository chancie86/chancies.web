using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace chancies.Blog.DataModels
{
    public class Document
        : BaseDataModel<DocumentId>
    {
        public SectionId SectionId { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }

        public IList<DocumentElement> Elements { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Populate)]
        public bool Published { get; set; }
    }
}
