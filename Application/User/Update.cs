using Application.Error;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Update
    {
        public class Command : IRequest
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Pesel { get; set; }
            public string Email { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetCurrentUserName());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Could not find user" });
                }

                if (user.UserName == "test")
                {
                    throw new RestException(HttpStatusCode.Forbidden, new { User = "Cannot update test account" });
                }


                if (request.Email != null)
                {
                    if (await context.Users.AnyAsync(u => u.Email == request.Email && u.UserName != userAccessor.GetCurrentUserName()))
                    {
                        throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email is already used" });
                    }
                    else
                    {
                        user.Email = request.Email;
                    }
                }

                user.FirstName = request.FirstName ?? user.FirstName;
                user.LastName = request.LastName ?? user.LastName;
                user.Pesel = request.Pesel ?? user.Pesel;

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    var token = await userManager.GenerateChangeEmailTokenAsync(user, request.Email);
                    await userManager.ChangeEmailAsync(user, request.Email, token);
                    return Unit.Value;
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}
