using API.Attributes;
using Application.Dto;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AuthorizeRoles(Role.Admin)]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [AuthorizeRoles(Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [AuthorizeRoles(Role.Admin)]
        [HttpPost("{id}/reset")]
        public async Task<ActionResult<Unit>> ResetPassword(string id)
        {
            return await Mediator.Send(new ResetPassword.Command { Id = id });
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpGet()]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }


        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpPut]
        public async Task<ActionResult<Unit>> UpdateAccount(Update.Command command)
        {
            return await Mediator.Send(command);
        }

        [AuthorizeRoles(Role.Admin)]
        [Route("/api/users")]
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> ListUsers()
        {
            return await Mediator.Send(new List.Query());
        }


        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpPut("password")]
        public async Task<ActionResult<Unit>> ChangePassword(ChangePassword.Command command)
        {
            return await Mediator.Send(command);
        }



        //TEST \/

        [AuthorizeRoles(Role.Admin)]
        [HttpGet("admin")]
        public ActionResult<object> TestAdminRole()
        {
            return new
            {
                IsAdmin = "Yes you are an admin"
            };
        }

        [AuthorizeRoles(Role.Admin, Role.Doctor)]
        [HttpGet("doctor")]
        public async Task<ActionResult<object>> TestDoctorRole()
        {
            return new
            {
                IsAdmin = "Yes you are a doctor"
            };
        }

        [HttpGet("all")]
        public async Task<ActionResult<object>> All()
        {
            return new
            {
                IsAdmin = "Yes you are all"
            };
        }
    }
}
