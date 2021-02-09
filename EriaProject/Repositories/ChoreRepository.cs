using EriaProject.Interfaces.Repositories;
using EriaProject.Models;
using EriaProject.Models.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Repositories
{
    public class ChoreRepository : IChoreRepository
    {
        private readonly ChoreContext _dbContext;
        public ChoreRepository(ChoreContext context)
        {
            _dbContext = context;
        }

        public async Task DeleteAsync(Chore chore)
        {
            var entity = await _dbContext.Chores.SingleOrDefaultAsync(c => c.Name == chore.Name);

            if (entity is null)
            {
                return;
            }

            _dbContext.Chores.Remove(entity);

            await SaveChangesAsync();
        }
        public async Task<ICollection<Chore>> GetAllAsync()
        {
            return await _dbContext.Chores.ToListAsync();
        }

        public async Task PostAsync(Chore chore)
        {
            await _dbContext.Chores.AddAsync(chore);

            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
