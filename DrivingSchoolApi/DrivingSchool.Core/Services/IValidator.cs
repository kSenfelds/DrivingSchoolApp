namespace DrivingSchool.Core.Services;

public interface IValidator
{
    bool InvalidTitle(string mark);
    bool ValidMark(int mark);
}