using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SchoolApi.Controllers
{
    [Route("registration")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly ISchoolService _schoolService;
        public RegistrationController(ISchoolService schoolService)
        {
            _schoolService = schoolService;
        }

        [HttpPut]
        public IActionResult RegisterStudent(Student student)
        {
            //validate
            _schoolService.Add(student);
            return Ok(student);
        }

        [HttpDelete]
        public IActionResult UnregisterStudent(Student student)
        {
            //validate
            _schoolService.Delete(student);
            return Ok(student);
        }
    }
}