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
        private Validator _validator;
        public RegistrationController(ISchoolService schoolService)
        {
            _schoolService = schoolService;
            _validator = new Validator(schoolService);
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
            if (_validator.IdCannotBeFound(id))
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
                _validator.IdCannotBeFound(id) || _validator.InvalidTitle(markTitle))
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
            if (_validator.IdCannotBeFound(id) || _validator.InvalidTitle(examTitle))
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
    }
}