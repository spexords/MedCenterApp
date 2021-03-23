using Application.Error;
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
    public class ResetPassword
    {
        public class Command : IRequest
        {
            public string Id { get; set; }  
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> userManager;

            public Handler(UserManager<AppUser> userManager)
            {
                this.userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByIdAsync(request.Id);

                if(user == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "There is no user with given id" });
                }

                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var result = await userManager.ResetPasswordAsync(user, token, "Pa$$w0rd");

                if (result.Succeeded)
                {
                    return Unit.Value;
                }
                throw new Exception("Could not reset password");
            }
        }
    }
}
