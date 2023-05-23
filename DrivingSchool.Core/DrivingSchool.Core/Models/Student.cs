
namespace DrivingSchool.Core.Models
{
    public class Student: Entity
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public int YearOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public enum  TrainingCategory
        {
            A,
            A1,
            B,
            BE,
            C,
            CE,
            D,
            M
        }
        public DateTime? DateOfTheoryExam { get; set; }
        public DateTime? DateOfDrivingExam { get; set; }
        public int? TheoryMark { get; set; }
        public int? DrivingMark { get; set; }
    }
}