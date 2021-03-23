using Application.Dto;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<UserDto> { }
        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor, IMapper mapper)
            {
                this.userManager = userManager;
                this.userAccessor = userAccessor;
                this.mapper = mapper;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUserName());
                return mapper.Map<UserDto>(user);
            }
        }
    }
}
