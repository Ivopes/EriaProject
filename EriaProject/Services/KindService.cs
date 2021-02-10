using EriaProject.Interfaces.Repositories;
using EriaProject.Interfaces.Services;
using EriaProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Services
{
    public class KindService : IKindService
    {
        private readonly IKindRepository _kindRepository;
        public KindService(IKindRepository kindRepository)
        {
            _kindRepository = kindRepository;
        }
        public async Task<ICollection<Kind>> GetAllAsync()
        {
            return await _kindRepository.GetAllAsync();
        }

        public async Task<Kind> GetByIdAsync(int kID)
        {
            return await _kindRepository.GetByIdAsync(kID);
        }

        public async Task PostAsync(Kind kind)
        {
            await _kindRepository.PostAsync(kind);
        }
    }
}
