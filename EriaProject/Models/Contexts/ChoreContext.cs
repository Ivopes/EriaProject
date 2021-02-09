using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Models.Contexts
{
    public class ChoreContext : DbContext
    {
        public DbSet<Chore> Chores { get; set; }

        public ChoreContext(DbContextOptions<ChoreContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
