using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;

namespace School.Services
{
    public class SchoolService: EntityService<Student>, ISchoolService
    {
        public SchoolService(ISchoolDbContext context) : base(context)
        {
        }

        public Student GetById(int id)
        {
            return GetById<Student>(id);
        }

        public void Add(Student entity)
        {
            Add<Student>(entity);
        }

        public void EditMark(int id, string markTitle, int mark)
        {
            var entity = GetById<Student>(id);
            entity.TheoryMark = markTitle=="theory"? entity.TheoryMark = mark: entity.TheoryMark;
            entity.DrivingMark = markTitle=="driving"? entity.DrivingMark = mark: entity.DrivingMark;
            
            Update<Student>(entity);
        }

        public void SetExamDate(int id, string examTitle, DateTime date)
        {
            var entity = GetById<Student>(id);
            entity.DateOfTheoryExam = examTitle=="theory"? entity.DateOfTheoryExam = date: null;
            entity.DateOfDrivingExam = examTitle=="driving"? entity.DateOfDrivingExam = date: null;
            Update<Student>(entity);
        }
        
        public void Delete(Student entity)
        {
            Delete<Student>(entity);
        }
    }
}
