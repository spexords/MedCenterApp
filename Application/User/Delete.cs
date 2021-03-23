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
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByIdAsync(request.Id);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "There is no user with given id" });
                }

                var result = await userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem deleting user");
            }
        }
    }
}
