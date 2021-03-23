using API.Attributes;
using Application.Conditions;
using Application.Dto;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ConditionsController : BaseController
    {
        [HttpGet]
        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        public async Task<ActionResult<List<ConditionStatsDto>>> List(int? size, bool? descending)
        {
            return await Mediator.Send(new List.Query(size, descending));
        }
    }
}
