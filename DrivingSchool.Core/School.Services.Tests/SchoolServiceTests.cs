using DrivingSchool.Core.Models;
using DrivingSchool.Data;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using School.Services;

namespace DrivingSchoolAPI.Tests;

public class SchoolServiceTests
{
    private SchoolDbContext _context;
    private SchoolService _service;
    
    [SetUp]
    public void Setup()
    {
        SetupDatabase();
        _service = new SchoolService(_context);
    }

    [Test]
    public void AddStudent_ValidInfoProvided_StudentsCountIs4()
    {
        var newStudent = new Student
        {
            Id = 4,
            Name = "Kri",
            LastName = "Lavi",
            Address = "Washington street 1",
            City = "London",
            DateOfRegistration = DateTime.Now,
            YearOfBirth = 1990,
            Email = "K.Lavi@gmail.com",
            PhoneNumber = "123456789",
            TrainingCategory = "B"
        };
        
        _service.Add(newStudent);
        _service.GetAll().Count().Should().Be(4);
    }

    [Test]
    public void GetStudent_ValidInfoProvided_ShouldReturnStudent()
    {
        var student = _service.GetById(1);
        student.Should().NotBe(null);
        student.Name.Should().Be("James");
        student.LastName.Should().Be("Bond");
        student.Address.Should().Be("Washington street 1");
        student.City.Should().Be("London");
        student.Email.Should().Be("J.Bond@gmail.com");
        student.PhoneNumber.Should().Be("123456789");
        student.YearOfBirth.Should().Be(1990);
        student.TrainingCategory.Should().Be("B");
        student.DateOfRegistration.Should().Be(DateTime.Today);
    }

    [Test]
    public void IdIsValid_ValidIdProvided_ReturnTrue()
    {
        _service.IdIsValid(1).Should().BeTrue();
    }

    [Test]
    public void IdIsValid_InvalidIdProvided_ReturnFalse()
    {
        _service.IdIsValid(5).Should().BeFalse();
    }

    [Test]
    public void EditMark_ValidInfoProvided_ShouldEditGivenMark()
    {
        _service.EditMark(1, "theory", 10);
        _service.EditMark(2, "driving", 9);
        var student1 = _service.GetById(1);
        var student2 = _service.GetById(2);
        student1.TheoryMark.Should().Be(10);
        student2.DrivingMark.Should().Be(9);
    }

    [Test]
    public void SetExamDate_ValidInfoProvided_ShouldSetExamDate()
    {
        _service.SetExamDate(1, "theory", DateTime.Today);
        _service.SetExamDate(2, "driving", DateTime.Today.AddDays(1));
        var student1 = _service.GetById(1);
        var student2 = _service.GetById(2);

        student1.DateOfTheoryExam.Should().Be(DateTime.Today);
        student1.UniqueTheoryCode.Should().NotBe(null);
        student2.DateOfDrivingExam.Should().Be(DateTime.Today.AddDays(1));
        student2.UniqueDrivingCode.Should().NotBe(null);
    }

    [Test]
    public void SetExamDate_InvalidExamTitleProvided_ShouldThrowArgumentException()
    {
        var act = () => _service.SetExamDate(1, "", DateTime.Today);
        act.Should().Throw<ArgumentException>();
    }

    [Test]
    public void Delete_ShouldDeleteStudent()
    {
        _service.Delete(1);
        var students = _service.GetAll();
        students.Count().Should().Be(2);

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
                    DateOfRegistration = DateTime.Today,
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