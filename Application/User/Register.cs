using Application.Dto;
using Application.Error;
using Application.Extensions;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<UserDto>
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public DateTime BirthDate { get; set; }
            public string Pesel { get; set; }
            public string Gender { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.BirthDate).NotEmpty();
                RuleFor(x => x.Pesel).NotEmpty();
                RuleFor(x => x.Gender).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, UserDto>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(UserManager<AppUser> userManager, DataContext context, IMapper mapper)
            {
                this.userManager = userManager;
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await context.Users.AnyAsync(u => u.Email == request.Email))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email is already taken" });
                }

                if (await context.Users.AnyAsync(u => request.Pesel == u.Pesel))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Pesel = "Pesel is already taken" });
                }

                var username = (request.FirstName.SafeSubstring(0, 3) + request.LastName.SafeSubstring(0, 4)).ToLower();

                while (await context.Users.AnyAsync(u => u.UserName == username))
                {
                    var rng = new Random();
                    username += rng.Next(0, 9);
                }

                var user = new AppUser
                {
                    BirthDate = request.BirthDate,
                    UserName = username,
                    DisplayName = username,
                    Email = request.Email,
                    Gender = Enum.Parse<Gender>(request.Gender),
                    FirstName = request.FirstName,
                    Role = Role.Doctor,
                    LastName = request.LastName,
                    Pesel = request.Pesel
                };

                var result = await userManager.CreateAsync(user, "Pa$$w0rd");

                if (result.Succeeded)
                {
                    return mapper.Map<UserDto>(user);
                }
                throw new Exception("Problem creating user");
            }
        }
    }
}
