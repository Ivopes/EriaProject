using EriaProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Interfaces.Repositories
{
    public interface IKindRepository
    {
        Task<ICollection<Kind>> GetAllAsync();
        Task PostAsync(Kind kID);
        Task<Kind> GetByIdAsync(int kID);
        Task SaveChangesAsync();
    }
}
