using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.Repository;

namespace chancies.Blog.Services.Implementation
{
    internal class ImageService
        : IImageService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IImageRepository _imageRepository;

        public ImageService(IDocumentRepository documentRepository, IImageRepository imageRepository)
        {
            _documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            _imageRepository = imageRepository ?? throw new ArgumentNullException(nameof(imageRepository));
        }

        public async Task Upload(DocumentId documentId, Stream fileStream, string filePath)
        {
            // Check that the document exists
            _ = await _documentRepository.Read(documentId);
            await _imageRepository.Upload(fileStream, $"{documentId}/{filePath}");
        }
        
        public async Task<IList<ImageReference>> List(DocumentId documentId)
        {
            // Check that the document exists
            _ = await _documentRepository.Read(documentId);
            return await _imageRepository.List(documentId.ToString());
        }

        public async Task Delete(DocumentId documentId, string filePath)
        {
            _ = await _documentRepository.Read(documentId);
            await _imageRepository.Delete($"{documentId}/{filePath}");
        }
    }
}
