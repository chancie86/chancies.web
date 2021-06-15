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

        public async Task<SectionId> Create(Section section)
        {
            section.Id = (SectionId)Guid.NewGuid();
            return await _sectionRepository.Create(section);
        }

        public async Task<Section> Get(SectionId id)
        {
            return await _sectionRepository.Read(id);
        }

        public async Task<IList<SectionListItem>> List()
        {
            return await _sectionRepository.List();
        }

        public async Task Delete(SectionId id)
        {
            await _sectionRepository.Delete(id);
        }

        public async Task Update(Section section)
        {
            await _sectionRepository.Update(section);
        }
    }
}
