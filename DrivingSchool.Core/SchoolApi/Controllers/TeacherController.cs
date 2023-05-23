using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SchoolApi.Controllers
{
    [Route("teacher")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ISchoolService _schoolService;

        public TeacherController(ISchoolService schoolService)
        {
            _schoolService = schoolService;
        }

        [HttpPost]
        [Route("mark")]
        public IActionResult EditMark(int id, string markTitle, int mark)
        {
            //validate
            _schoolService.EditMark(id, markTitle, mark);
            return Ok(_schoolService.GetById(id));
        }

        [HttpPost]
        [Route("exam")]
        public IActionResult SetExamDate(int id, string examTitle, DateTime date)
        {
            //validate
            _schoolService.SetExamDate(id, examTitle, date);
            return Ok(_schoolService.GetById(id));
        }
    }
}
