using System.ComponentModel.DataAnnotations;
using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using School.Services;
using Validator = SchoolApi.Validator;

namespace DrivingSchoolAPI.Tests;

public class ValidatorTests
{
    private SchoolDbContext _context;
    private IEntityService<Student> _service;
    private Validator _validator;

    [SetUp]
    public void Setup()
    {
        SetupDatabase();
        _service = new SchoolService(_context);
        _validator = new Validator(_service);
    }

    [Test]
    public void IdCannotBeFound_ValidIdProvided_ReturnFalse()
    {
        _validator.IdCannotBeFound(1).Should().BeFalse();
    }

    [Test]
    public void IdCannotBeFound_InvalidIdProvided_ReturnTrue()
    {
        _validator.IdCannotBeFound(4).Should().BeTrue();
    }

    [Test]
    public void InvalidTitle_ValidTitleProvided_ReturnFalse()
    {
        _validator.InvalidTitle("theory").Should().BeFalse();
        _validator.InvalidTitle("driving").Should().BeFalse();
    }

    [Test]
    public void InvalidTitle_InvalidTitleProvided_ReturnTrue()
    {
        _validator.InvalidTitle("a").Should().BeTrue();
        _validator.InvalidTitle("").Should().BeTrue();
    }

    [Test]
    public void ValidMark_ValidMarkProvided_ReturnTrue()
    {
        _validator.ValidMark(9).Should().BeTrue();
    }

    [Test]
    public void ValidMark_InvalidMarkProvided_ReturnFalse()
    {
        _validator.ValidMark(11).Should().BeFalse();
        _validator.ValidMark(0).Should().BeFalse();
        _validator.ValidMark(-1).Should().BeFalse();
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