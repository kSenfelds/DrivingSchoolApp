using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace School.Services
{
    public class SchoolService: EntityService<Student>, ISchoolService
    {
        public SchoolService(ISchoolDbContext context) : base(context)
        {
        }

        public Student GetById(int id)
        {
            return GetById<Student>(id);
        }

        public bool IdIsValid(int id)
        {
            return _context.Students.Any(x => x.Id == id);
        }

        public void Add(Student entity)
        {
            Add<Student>(entity);
        }

        public void EditMark(int id, string markTitle, int mark)
        {
            var entity = GetById<Student>(id);
            entity.TheoryMark = markTitle=="theory"? entity.TheoryMark = mark: entity.TheoryMark;
            entity.DrivingMark = markTitle=="driving"? entity.DrivingMark = mark: entity.DrivingMark;
            
            Update<Student>(entity);
        }

        public void SetExamDate(int id, string examTitle, DateTime date)
        {
            var entity = GetById<Student>(id);
            if (examTitle == "theory")
            {
                entity.DateOfTheoryExam = date;
                entity.UniqueTheoryCode = Guid.NewGuid().ToString();
            }
            else if (examTitle == "driving")
            {
                entity.DateOfDrivingExam = date;
                entity.UniqueDrivingCode = Guid.NewGuid().ToString();
            }
            else
            {
                throw new ArgumentException("Invalid exam title");
            }
            
            Update<Student>(entity);
        }
        
        public void Delete(int id)
        {
            
            Delete<Student>(id);
        }

        public List<Student> GetAll()
        {
            return GetAll<Student>();
        }

        public async Task SendEmail(int id, string examTitle)
        {
            var student = GetById(id);
            var reciever = student.Email;

            string apiKey = "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";
            var client = new SendGridClient(apiKey);
            var senderEmail = new EmailAddress("testdrivingschoolapi@gmail.com");
            var recieverEmail = new EmailAddress(reciever);
            var emailSubject = examTitle == "theory"? $"Theory exam for {student.Name} {student.LastName}" :
                $"Driving exam for {student.Name} {student.LastName}";
            string textContent = examTitle == "theory"? $"Your theory exam is scheduled for {student.DateOfTheoryExam}, " +
                                                        $"Your unique code : {student.UniqueTheoryCode}" :
                $"Your driving exam is scheduled for {student.DateOfDrivingExam}, Your unique code : {student.UniqueDrivingCode}";
            string htmlContent = $"<strong>{textContent}</strong>";
            var msg = MailHelper.CreateSingleEmail(senderEmail, recieverEmail, emailSubject, textContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
