using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Blog.DataModels;
using chancies.Blog.Repository;

namespace chancies.Blog.Services.Implementation
{
    public class SectionService
        : ISectionService
    {
        private readonly ISectionRepository _sectionRepository;

        public SectionService(ISectionRepository sectionRepository)
        {
            _sectionRepository = sectionRepository ?? throw new ArgumentNullException(nameof(sectionRepository));
        }

        public async Task<Guid> Create(Section section)
        {
            section.Id = Guid.NewGuid();
            return await _sectionRepository.Create(section);
        }

        public async Task<Section> Get(Guid id)
        {
            return await _sectionRepository.Read(id);
        }

        public async Task<IList<Section>> Get()
        {
            return await _sectionRepository.Read();
        }

        public async Task Delete(Guid id)
        {
            await _sectionRepository.Delete(id);
        }

        public async Task Update(Section section)
        {
            await _sectionRepository.Update(section);
        }
    }
}
