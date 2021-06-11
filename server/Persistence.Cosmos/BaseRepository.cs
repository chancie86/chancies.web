using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.Exception;
using Microsoft.Azure.Cosmos;

namespace chancies.Persistence.Cosmos
{
    public abstract class BaseRepository<TDocument>
        where TDocument : BaseDataModel
    {
        private readonly Container _container;
        private readonly PartitionKey _partitionKey;

        protected BaseRepository(ICosmosService cosmosService)
        {
            cosmosService = cosmosService ?? throw new ArgumentNullException(nameof(cosmosService));
            _partitionKey = new PartitionKey(typeof(TDocument).Name);
            _container = cosmosService.GetContainer();
        }

        public async Task<Guid> Create(TDocument document)
        {
            var response = await _container.CreateItemAsync<TDocument>(document, _partitionKey);
            return response.Resource.Id;
        }

        public async Task Delete(Guid id)
        {
            await _container.DeleteItemAsync<TDocument>(id.ToString(), _partitionKey);
        }

        public async Task<TDocument> Read(Guid id)
        {
            var response = await _container.ReadItemAsync<TDocument>(id.ToString(), _partitionKey);
            var document = response.Resource;

            if (document == null)
            {
                throw new NotFoundException(typeof(TDocument).Name);
            }

            return document;
        }

        public async Task<IList<TDocument>> Read()
        {
            var sqlQuery = $"SELECT * FROM {typeof(TDocument).Name};";
            var queryDefinition = new QueryDefinition(sqlQuery);
            var queryResultSetIterator = _container.GetItemQueryIterator<TDocument>(queryDefinition);

            var results = new List<TDocument>();

            while (queryResultSetIterator.HasMoreResults)
            {
                var currentResultSet = await queryResultSetIterator.ReadNextAsync();
                results.AddRange(currentResultSet);
            }

            return results;
        }

        public async Task Update(TDocument document)
        {
            await _container.ReplaceItemAsync(document, document.Id.ToString(), _partitionKey);
        }
    }
}
