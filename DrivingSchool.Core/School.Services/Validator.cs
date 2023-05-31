using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;

namespace SchoolApi;

public class Validator: IValidator
{
    private readonly IEntityService<Student> _service;
    private const string _theoryTitle = "theory";
    private const string _drivingTitle = "driving";
    public Validator(IEntityService<Student> service)
    {
        _service = service;
    }
    
    public bool InvalidTitle(string mark)
    {
        if (mark == _theoryTitle || mark == _drivingTitle)
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