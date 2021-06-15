﻿using chancies.Blog.DataModels;
using chancies.Blog.Repository;

namespace chancies.Persistence.Cosmos.Blog
{
    public class SectionRepository
        : BaseRepository<Section>, ISectionRepository
    {
        public SectionRepository(ICosmosService cosmosService)
            : base(cosmosService)
        {
        }
    }
}