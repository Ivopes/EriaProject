using EriaProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Interfaces.Services
{
    public interface IKindService
    {
        Task<ICollection<Kind>> GetAllAsync();
        Task<Kind> GetByIdAsync(int kID);
        Task PostAsync(Kind kind);
    }
}
