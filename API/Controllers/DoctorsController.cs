using API.Attributes;
using Application.Doctors;
using Application.Dto;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class DoctorsController : BaseController
    {
        [HttpGet]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<List<DoctorDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}
