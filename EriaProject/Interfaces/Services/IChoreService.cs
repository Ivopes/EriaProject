using EriaProject.Models;
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
        Task DeleteAsync(Chore chore);
    }
}
