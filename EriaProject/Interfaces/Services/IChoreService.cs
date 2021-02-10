using EriaProject.Models;
using EriaProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Interfaces.Repositories
{
    public interface IChoreService
    {
        Task<ICollection<Chore>> GetAllAsync();
        Task PostAsync(Chore chore);
        Task DeleteByIdAsync(int cID);
        Task PutAsync(Chore chore);
        Task<Chore> GetByIdAsync(int cId);
    }
}
