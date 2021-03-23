using Application.Dto;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class List
    {
        public class Query : IRequest<List<UserDto>> { }
        public class Handler : IRequestHandler<Query, List<UserDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await context.Users.Where(u => u.Role != Role.Admin).ToListAsync();
                return mapper.Map<List<UserDto>>(users);
            }
        }
    }
}
