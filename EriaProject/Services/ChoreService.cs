using EriaProject.Interfaces.Repositories;
using EriaProject.Models;
using EriaProject.Models.Entities;
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

        public async Task DeleteByIdAsync(int cID)
        {
            await _choreRepository.DeleteByIdAsync(cID);
        }

        public async Task<ICollection<Chore>> GetAllAsync()
        {
            return await _choreRepository.GetAllAsync();
        }

        public async Task<Chore> GetByIdAsync(int cId)
        {
            return await _choreRepository.GetByIdAsync(cId);
        }

        public async Task PostAsync(Chore chore)
        {
            await _choreRepository.PostAsync(chore);
        }

        public async Task PutAsync(Chore chore)
        {
            await _choreRepository.PutAsync(chore);
        }
    }
}
