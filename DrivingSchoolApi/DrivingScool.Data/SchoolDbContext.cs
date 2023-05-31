
using DrivingSchool.Core.Models;
using DrivingSchool.Data;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchool.Data
{
    public class SchoolDbContext: DbContext, ISchoolDbContext
    {
        public SchoolDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }
    }
}
