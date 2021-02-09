using EriaProject.Interfaces.Repositories;
using EriaProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Services
{
    public class ChoreService : IChoreService
    {
        private readonly IChoreRepository _choreRepository;
        public ChoreService(IChoreRepository choreRepository)
        {
            _choreRepository = choreRepository;
        }

        public async Task DeleteAsync(Chore chore)
        {
            await _choreRepository.DeleteAsync(chore);
        }

        public async Task<ICollection<Chore>> GetAllAsync()
        {
            return await _choreRepository.GetAllAsync();
        }

        public async Task PostAsync(Chore chore)
        {
            await _choreRepository.PostAsync(chore);
        }
    }
}
