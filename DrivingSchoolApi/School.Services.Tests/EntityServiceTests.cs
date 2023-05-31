using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using School.Services;

namespace DrivingSchoolAPI.Tests
{
    
    public class EntityServiceTests
    {
        private SchoolDbContext _context;
        private IEntityService<Student> _service;

        [SetUp]
        public void Setup()
        {
            SetupDatabase();
            _service = new EntityService<Student>(_context);
        }

        [Test]
        public void GetById_ShouldReturnStudentWithGivenId()
        {
            var student = _service.GetById<Student>(1);

            student.Should().NotBeNull();
            student.Id.Should().Be(1);
        }

        [Test]
        public void GetAll_ShouldReturn3students()
        {
            var students = _service.GetAll<Student>();
            students.Count().Should().Be(3);
        }

        [Test]
        public void AddStudent_ValidDataProvided_StudentsCountIs4()
        {
            var newStudent = new Student
            {
                Id = 4,
                Name = "Kriss",
                LastName = "Cross",
                Address = "Washington street 1",
                City = "London",
                DateOfRegistration = DateTime.Now,
                YearOfBirth = 1990,
                Email = "K.Cross@gmail.com",
                PhoneNumber = "123456789",
                TrainingCategory = "B"

            };
            _service.Add(newStudent);
            var students = _service.GetAll<Student>();
            students.Count().Should().Be(4);
        }

        [Test]
        public void DeleteStudent_StudentCountIs2()
        {
            _service.Delete<Student>(1);

            _service.GetAll<Student>().Count().Should().Be(2);
        }

        [Test]
        public void UpdateStudent_ValidDataProvided_ShouldUpdateInfo()
        {
            var student = _service.GetById<Student>(1);
            student.DateOfDrivingExam = DateTime.Today;
            _service.Update(student);

            var updatedStudent = _service.GetById<Student>(1);
            updatedStudent.DateOfDrivingExam.Should().Be(DateTime.Today);
            

        }
        
        
        
        private void SetupDatabase()
        {
            var options = new DbContextOptionsBuilder<SchoolDbContext>().UseInMemoryDatabase("TestDB").Options;
            _context = new SchoolDbContext(options);

            SeedDb();
        }
        public void SeedDb()
        {
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
            
            _context.Students.Add(new Student 
            { 
                Id = 1, 
                Name = "James",
                LastName = "Bond",
                Address = "Washington street 1",
                City = "London",
                DateOfRegistration = DateTime.Now,
                YearOfBirth = 1990,
                Email = "J.Bond@gmail.com",
                PhoneNumber = "123456789",
                TrainingCategory = "B"
            });
            _context.Students.Add(new Student
            {
                Id = 2,
                Name = "John",
                LastName = "Wick",
                Address = "Washington street 2",
                City = "London",
                DateOfRegistration = DateTime.Now,
                YearOfBirth = 1990,
                Email = "J.Wick@gmail.com",
                PhoneNumber = "123456789",
                TrainingCategory = "B"
            });
            _context.Students.Add(new Student
            {
                Id = 3,
                Name = "Carl",
                LastName = "Anthony",
                Address = "Washington street 3",
                City = "London",
                DateOfRegistration = DateTime.Now,
                YearOfBirth = 1990,
                Email = "C.Anthony@gmail.com",
                PhoneNumber = "123456789",
                TrainingCategory = "B"
            });
            _context.SaveChanges();
            _context.Students.Count().Should().Be(3);
        }
    }
}