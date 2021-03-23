using Application.Error;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class ChangePassword
    {
        public class Command : IRequest
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IUserAccessor userAccessor;

            public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                this.userManager = userManager;
                this.userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUserName());
                if(user == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "Could not find user" });
                }
                if(user.UserName == "test")
                {
                    throw new RestException(HttpStatusCode.Forbidden, new { User = "Cannot update test account" });
                }

                var result = await userManager.ChangePasswordAsync(user, request.OldPassword, request.NewPassword);
                if (result.Succeeded)
                {
                    return Unit.Value;
                }
                else
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Password = result.Errors });
                }
                
            }
        }
    }
}
