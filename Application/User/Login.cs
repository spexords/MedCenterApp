using Application.Dto;
using Application.Error;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<UserDto> 
        { 
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IMapper mapper;

            public Handler(UserManager<AppUser> userManager, IMapper mapper)
            {
                this.userManager = userManager;
                this.mapper = mapper;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByEmailAsync(request.Email);

               
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { User = "Invalid email or password" });
                }

                if(!await userManager.CheckPasswordAsync(user, request.Password))
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { User = "Invalid email or password" });
                }

                return mapper.Map<UserDto>(user);
            }
        }
    }
}
