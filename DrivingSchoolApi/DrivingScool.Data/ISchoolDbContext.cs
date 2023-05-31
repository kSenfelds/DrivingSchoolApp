using DrivingSchool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DrivingSchool.Data
{
    public interface ISchoolDbContext
    {
        public DbSet<Student> Students { get; set; }
        public int SaveChanges();

        DbSet<T> Set<T>() where T : class;
        EntityEntry<T> Entry<T>(T entity) where T : class;
    }
}
