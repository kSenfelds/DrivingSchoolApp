using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace SchoolApi.Controllers
{
    [Route("registration")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly ISchoolService _schoolService;
        private IValidator _validator;
        public RegistrationController(ISchoolService schoolService, IValidator validator)
        {
            _schoolService = schoolService;
            _validator = validator;
        }

        [HttpPut]
        public IActionResult RegisterStudent(Student student)
        {
            _schoolService.Add(student);
            return Ok(student);
        }

        [HttpDelete]
        public IActionResult DeleteStudent(int id)
        {
            if (!_schoolService.IdIsValid(id))
            {
                return BadRequest();
            }
            _schoolService.Delete(id);
            return Ok();
        }
        
        [HttpPost]
        [Route("mark")]
        public IActionResult EditMark(int id, string markTitle, int mark)
        {
            if (!_validator.ValidMark(mark) ||
                !_schoolService.IdIsValid(id) || _validator.InvalidTitle(markTitle))
            {
                return BadRequest();
            }
            _schoolService.EditMark(id, markTitle, mark);
            return Ok(_schoolService.GetById(id));
        }
        
        [HttpPost]
        [Route("exam")]
        public IActionResult SetExamDate(int id, string examTitle, DateTime date)
        {
            if (!_schoolService.IdIsValid(id) || _validator.InvalidTitle(examTitle))
            {
                return BadRequest();
            }
            _schoolService.SetExamDate(id, examTitle, date);
            return Ok(_schoolService.GetById(id));
        }
        
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_schoolService.GetAll());
        }

        [HttpGet]
        [Route("email")]
        public IActionResult SendEmail(int id, string examTitle)
        {
            var response = _schoolService.SendEmail(id, examTitle);
            return Ok();
        }
    }
}