
using DrivingSchool.Core.Models;

namespace DrivingSchool.Core.Services
{
    public interface ISchoolService: IEntityService<Student>
    {
        Student GetById(int id);
        void Add(Student entity);
        void EditMark(int id, string markTitle, int mark);
        void SetExamDate(int id, string examTitle,  DateTime date);
        void Delete(int id);
        List<Student> GetAll();
    }
}