using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using FluentAssertions;
using Moq.AutoMock;
using NUnit.Framework;
using Validator = SchoolApi.Validator;

namespace DrivingSchoolAPI.Tests;

public class ValidatorTests
{
    private AutoMocker _mocker;
    private Validator _validator;

    [SetUp]
    public void Setup()
    {
        _mocker = new AutoMocker();
        _validator = new Validator(_mocker.GetMock<IEntityService<Student>>().Object);
    }

    [Test]
    public void IdCannotBeFound_ValidIdProvided_ReturnFalse()
    {
        var student = new Student
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
        };
        
        var mockSchoolService = _mocker.GetMock<IEntityService<Student>>();
        mockSchoolService.Setup(x => x.GetById<Student>(1)).Returns(student);
        _validator.IdCannotBeFound(1).Should().BeFalse();
    }

    [Test]
    public void IdCannotBeFound_InvalidIdProvided_ReturnTrue()
    {
        var student = new Student
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
        };
        
        var mockSchoolService = _mocker.GetMock<IEntityService<Student>>();
        mockSchoolService.Setup(x => x.GetById<Student>(1)).Returns(student);
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
}