using API.Attributes;
using Application.Appointments;
using Application.Dto;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AppointmentsController : BaseController
    {
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpGet]
        public async Task<ActionResult<List<AppointmentDto>>> List(bool allAppointments, DateTime? startDate, int? size, string status)
        {
            return await Mediator.Send(new List.Query(allAppointments, startDate, size, status));
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpPost]
        public async Task<ActionResult<AppointmentDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, Update.Command command)
        {
            command.AppointmentId = id;
            return await Mediator.Send(command);
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpPut("{id}/conditions")]
        public async Task<ActionResult<ConditionDto>> ConnectCondition(int id, ConnectCondition.Command command)
        {
            command.AppointmentId = id;
            return await Mediator.Send(command);
        }


        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpDelete("{aid}/conditions/{cid}")]
        public async Task<ActionResult<Unit>> DisconnectCondition(int aid, int cid)
        {
            return await Mediator.Send(new DisconnectCondition.Command { AppointmentId = aid, ConditionId = cid });
        }

    }
}
