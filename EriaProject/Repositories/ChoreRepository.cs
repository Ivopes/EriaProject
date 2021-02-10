using EriaProject.Interfaces.Repositories;
using EriaProject.Models;
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
    public class ChoreRepository : IChoreRepository
    {
        private readonly ChoreContext _dbContext;
        public ChoreRepository(ChoreContext context)
        {
            _dbContext = context;
        }

        public async Task DeleteByIdAsync(int cID)
        {
            var entity = await _dbContext.Chores.FindAsync(cID);

            if (entity is null)
            {
                throw new NotFoundException();
            }

            _dbContext.Chores.Remove(entity);

            await SaveChangesAsync();
        }
        public async Task<ICollection<Chore>> GetAllAsync()
        {
            return await _dbContext.Chores.ToListAsync();
        }

        public async Task<Chore> GetByIdAsync(int cID)
        {
            var entity = await _dbContext.Chores.FindAsync(cID);

            if (entity is null)
            {
                throw new NotFoundException();
            }

            return entity;
        }

        public async Task PostAsync(Chore chore)
        {
            await _dbContext.Chores.AddAsync(chore);

            await SaveChangesAsync();
        }

        public async Task PutAsync(Chore chore)
        {
            var entity = await GetByIdAsync(chore.ChoreID);

            if (entity is null)
            {
                throw new NotFoundException();
            }

            entity.Kind = chore.Kind;
            entity.Name = chore.Name;
            entity.TimeEnd = chore.TimeEnd;
            entity.TimeStart = chore.TimeStart;

            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
