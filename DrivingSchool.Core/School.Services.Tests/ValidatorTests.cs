using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using FluentAssertions;
using Moq.AutoMock;
using NUnit.Framework;
using Validator = School.Services.Validator;

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