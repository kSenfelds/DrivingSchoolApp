using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;

namespace SchoolApi;

public class Validator
{
    private readonly IEntityService<Student> _service;
    public Validator(IEntityService<Student> service)
    {
        _service = service;
    }
    public bool IdCannotBeFound(int id)
    {
        var student = _service.GetById<Student>(id);
        return student.Id != id;
    }

    public bool InvalidTitle(string mark)
    {
        return mark != "theory" || mark != "driving";
    }

    public bool ValidMark(int mark)
    {
        return mark is > 0 and <= 10;
    }
    
}