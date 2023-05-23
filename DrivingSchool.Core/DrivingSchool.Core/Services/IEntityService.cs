
using DrivingSchool.Core.Models;

namespace DrivingSchool.Core.Services
{
    public interface IEntityService<T>
    {
        public T GetById<T>(int id) where T : Entity;
        public void Add<T>(T entity) where T : Entity;
        public void Update<T>(T entity) where T: Entity;
        public void Delete<T>(T entity) where T: Entity;
    }
}
