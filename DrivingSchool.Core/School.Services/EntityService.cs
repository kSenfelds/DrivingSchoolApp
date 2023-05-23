using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using Microsoft.EntityFrameworkCore;

namespace School.Services
{
    public class EntityService<T> : IEntityService<T> where T : Entity
    {
        protected ISchoolDbContext _context;
        public EntityService(ISchoolDbContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : Entity
        {
            _context.Set<T>().Add(entity);
            _context.SaveChanges();
        }

        public void Delete<T>(T entity) where T : Entity
        {
            _context.Set<T>().Remove(entity);
            _context.SaveChanges();
        }

        public T GetById<T>(int id) where T : Entity
        {
           return _context.Set<T>().SingleOrDefault(x => x.Id == id);
        }

        public void Update<T>(T entity) where T : Entity
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}