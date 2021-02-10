using EriaProject.Interfaces.Repositories;
using EriaProject.Models.Contexts;
using EriaProject.Models.Entities;
using EriaProject.Utilities.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Repositories
{
    public class KindRepository : IKindRepository
    {
        private readonly ChoreContext _dbContext;
        public KindRepository(ChoreContext context)
        {
            _dbContext = context;
        }
        public async Task<ICollection<Kind>> GetAllAsync()
        {
            return await _dbContext.Kinds.ToListAsync();
        }

        public async Task<Kind> GetByIdAsync(int kID)
        {

            var entity = await _dbContext.Kinds.FindAsync(kID);

            if (entity is null)
            {
                throw new NotFoundException();
            }

            return entity;
        }

        public async Task PostAsync(Kind kind)
        {
            await _dbContext.Kinds.AddAsync(kind);

            await SaveChangesAsync();
        }
        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
