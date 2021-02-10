using EriaProject.Models;
using EriaProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Interfaces.Repositories
{
    public interface IChoreRepository
    {
        Task<ICollection<Chore>> GetAllAsync();
        Task PostAsync(Chore chore);
        Task SaveChangesAsync();
        Task DeleteByIdAsync(int cID);
        Task PutAsync(Chore chore);
        Task<Chore> GetByIdAsync(int cId);
    }
}
