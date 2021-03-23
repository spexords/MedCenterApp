using API.Attributes;
using Application.Dto;
using Application.Patients;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PatientsController : BaseController
    {
        [HttpPost]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<PatientDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<List<PatientDto>>> List(string pesel, string lastName, string firstName)
        {
            return await Mediator.Send(new List.Query(pesel, lastName, firstName));
        }

        [HttpGet("{id}")]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<PatientDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPut("{id}")]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<Unit>> Update(int id, Update.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<Unit>> Update(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

    }
}
