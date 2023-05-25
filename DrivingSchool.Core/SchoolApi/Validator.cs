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
        if (student == null)
        {
            return true;
        }

        return false;
    }

    public bool InvalidTitle(string mark)
    {
        if (mark == "theory" || mark == "driving")
        {
            return false;
        }

        return true;
    }

    public bool ValidMark(int mark)
    {
        return mark is > 0 and <= 10;
    }
    
}